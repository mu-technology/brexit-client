import {Component, Inject, OnDestroy} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Vote} from './vote';
import {VoteService} from './vote.service';
import {LOCALSTORAGE} from '../config';
import {AuthenticationService} from '../authentication/authentication.service';
import {submitVote, voteSuccess, authSuccess} from '../shared/brexit.actions';

@Component({
    selector: 'vote',
    template: `
    <div class="vote 123">
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

    votes: Vote[] = this.getVotes(this.store.getState());
    unsubscribe: Function;

    constructor (private voteService: VoteService, private authenticationService: AuthenticationService,
                 @Inject('BrexitStore') private store: any) {
        this.unsubscribe = this.store.subscribe(() => {
            this.votes = this.getVotes(this.store.getState());
        });

        const isUserAuthenticated = this.store.getState().user.isAuthenticated;
        if (isUserAuthenticated) {
            this.voteService.getVote()
                .subscribe((vote) => {
                    this.store.dispatch(voteSuccess(1, parseInt(vote.id, 10)));
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
                                this.store.dispatch(voteSuccess(1, data.id));
                            });
                    },
                    (authErr) => { console.log('err ->', authErr); }
                );
        } else {
            this.store.dispatch(submitVote());
            this.voteService.postVote(vote)
                .subscribe((data) => {
                    this.store.dispatch(voteSuccess(1, data.id));
                });
        }
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private getVotes (state) {
        //noinspection TypeScriptUnresolvedVariable
        const question = state.questions.items.find(q => q.id === 1);
        return question.answers.map(a => new Vote(a));
    }
}