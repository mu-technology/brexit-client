import {Component, Inject, OnDestroy} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Vote} from './vote';
import {VoteService} from './vote.service';
import {LOCALSTORAGE, TEXTS} from '../config';
import {AuthenticationService} from '../authentication/authentication.service';
import {submitVote, voteSuccess, authSuccess} from '../shared/brexit.actions';

const BREXIT_QUESTION_ID = 1;

@Component({
    selector: 'vote',
    template: `
        <div class="vote">
            <div class="vote-intro">
                <p>{{texts.intro}}</p>
            </div>
        
            <div class="vote-question">
                <h2>{{ question.label }}</h2>
            </div>
    
            <ul class="options-list">
                <li class="options-list-item" *ngFor="#vote of votes">
                    <button class="option-button"
                            [class.selected]="vote.isSelected"
                            (click)="submitVote(vote)">{{ vote.label }}</button>
                </li>
            </ul>
        </div>`,
    providers: [HTTP_PROVIDERS, VoteService, AuthenticationService]
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