import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {MdButton} from '@angular2-material/button';
import {Store} from '@ngrx/store';

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

    constructor(private store: Store) {
        const polls = this.store.select('polls');

        const selectedAnswer = polls
            .flatMap(p => p.items)
            .filter(p => p.id === 'BREXIT')
            .flatMap(p => p.answers)
            .filter(a => a.isSelected);

        selectedAnswer.subscribe(a => {
            this.hasUserVoted = Boolean(a);
        });
    }
}