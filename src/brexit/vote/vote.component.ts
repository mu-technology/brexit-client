import {Component, Inject, OnDestroy} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Vote} from './vote';
import {VoteService} from './vote.service';
import {LOCALSTORAGE, TEXTS} from '../config';
import {AuthenticationService} from '../authentication/authentication.service';
import {submitVote, voteSuccess, authSuccess} from '../shared/brexit.actions';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdButton} from '@angular2-material/button';

const BREXIT_QUESTION_ID = 1;

@Component({
    selector: 'vote',
    template: `
        <md-card class="vote-card">
            <md-card-title>{{ question.label }}</md-card-title>
            <img md-card-image src="assets/brexit-bg.jpg">
            <md-card-actions class="vote-button-group">
                <button md-raised-button class="option-button" *ngFor="#vote of votes"
                            [class.selected]="vote.isSelected"
                            (click)="submitVote(vote)">{{ vote.label }}</button>
            </md-card-actions>
        </md-card>`,
    directives: [MD_CARD_DIRECTIVES, MdButton],
    providers: [HTTP_PROVIDERS, VoteService, AuthenticationService],
    styleUrls: ['src/brexit/vote/vote.css']
})
export class VoteComponent implements OnDestroy {
    question: Object;
    votes: Vote[] = this.getVotes(this.store.getState());
    texts: Object;
    unsubscribe: Function;

    constructor (private voteService: VoteService, private authenticationService: AuthenticationService,
                 @Inject('BrexitStore') private store: any) {
        const initialState = this.store.getState();
        const isUserAuthenticated = initialState.user.isAuthenticated;
        this.texts = TEXTS;
        this.question = this.getQuestion(initialState, BREXIT_QUESTION_ID);

        this.unsubscribe = this.store.subscribe(() => {
            this.votes = this.getVotes(this.store.getState());
        });

        if (isUserAuthenticated) {
            this.voteService.getVote()
                .subscribe((vote) => {
                    this.store.dispatch(voteSuccess(BREXIT_QUESTION_ID, parseInt(vote.id, 10)));
                });
        }
    }

    submitVote (vote) {
        window.localStorage.setItem(LOCALSTORAGE.KEYS.VOTE, JSON.stringify(vote));

        const isUserAuthenticated = this.store.getState().user.isAuthenticated;

        if (!isUserAuthenticated) {
            this.authenticationService.authenticate()
                .subscribe(
                    (user) => {
                        this.store.dispatch(authSuccess(user.data));
                        this.store.dispatch(submitVote());
                        this.voteService.postVote(vote)
                            .subscribe((data) => {
                                this.store.dispatch(voteSuccess(BREXIT_QUESTION_ID, data.id));
                            });
                    },
                    (authErr) => { console.log('err ->', authErr); }
                );
        } else {
            this.store.dispatch(submitVote());

            this.voteService.postVote(vote)
                .subscribe((data) => {
                    this.store.dispatch(voteSuccess(BREXIT_QUESTION_ID, data.id));
                });
        }
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private getQuestion (state, questionId) {
        //noinspection TypeScriptUnresolvedVariable
        return state.questions.items.find(q => q.id === questionId);
    }

    private getVotes (state) {
        //noinspection TypeScriptUnresolvedVariable
        const question = state.questions.items.find(q => q.id === BREXIT_QUESTION_ID);
        return question.answers.map(a => new Vote(a));
    }
}