import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {AnswerListComponent} from './answer-list/answer-list.component';
import {SUCCESSFUL_ANSWER} from '../../shared/poll-reducer';
import {Answer} from './answer';

@Component({
    selector: 'brexit-poll',
    template: `
        <style>
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .vote-card-title { text-align: center; }
            
            .results-btn { color: #2196f3; }
            
            .results-btn:hover { background: white; }
            
            @media only screen and (min-width: 668px){
                .vote-card { width: 50%; }
            }
        </style>
        <md-card class="vote-card">
            <md-card-title class="vote-card-title">{{ question }}</md-card-title>
            <img md-card-image src="assets/brexit-bg.jpg">
            <md-card-actions>
                <brexit-answer-list [answers]="answers" (change)="selectAnswer($event)"></brexit-answer-list>
            </md-card-actions>
        </md-card>
    `,
    directives: [MD_CARD_DIRECTIVES, AnswerListComponent]
})
export class PollComponent {
    private answers: Answer[];
    private isAuthenticated: boolean;
    private question: string;

    constructor(private router: Router, private store: Store) {
        const polls: Observable = this.store.select('polls');
        const user = this.store.select('user');

        polls.subscribe(poll => {
            const brexitPoll = poll.items.find(p => p.id === 'BREXIT');
            this.question = brexitPoll.question;
            this.answers = brexitPoll.answers;
        });

        user.subscribe(u => {
            this.isAuthenticated = u.isAuthenticated;

            if (!this.isAuthenticated) {
                this.goToIntro();
            }
        });
    }

    selectAnswer(answer) {
        if (!this.isAuthenticated) {
            this.goToIntro();
        } else {
            this.store.dispatch(SUCCESSFUL_ANSWER({
                questionId: 'BREXIT',
                answerId: answer.id
            }));
        }
    }

    private goToIntro() {
        this.router.navigate(['Intro']);
    }
}