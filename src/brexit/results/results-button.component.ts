import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {MdButton} from '@angular2-material/button';
import {Store} from '@ngrx/store';
import {AppStore} from '../shared/store';
import {Observable} from 'rxjs/Observable';
import {Polls} from '../shared/poll-reducer';
import {Poll} from '../poll/poll';
import {Answer} from '../poll/answer';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'results-button',
    template: `
        <style>
            :host {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            
            .results-btn { color: #2196f3; }
            .results-btn:hover { background: white; }
        </style>
        <button class="results-btn" md-button
                *ngIf="hasUserVoted"
                [routerLink]="['Results']">View Results</button>
    `,
    directives: [MdButton, ROUTER_DIRECTIVES]
})
export class ResultsButtonComponent {

    hasUserVoted: boolean;

    constructor(private store: Store<AppStore>) {
        const polls$: Observable<Polls> = this.store.select('polls');

        const selectedAnswer = polls$
            .concatMap((p: Polls) => p.items)
            .filter((p: Poll) => p.id === 'BREXIT')
            .concatMap((p: Poll) => p.answers)
            .filter((a: Answer) => a.isSelected);

        selectedAnswer.subscribe((a: Answer) => {
            this.hasUserVoted = Boolean(a);
        });
    }
}