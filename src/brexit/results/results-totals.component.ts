import {Component} from 'angular2/core';

@Component({
    selector: 'results-totals',
    template: `
        <style>
            .results-totals {
                text-align: center;
                font-weight: normal;
            }
        </style>
        <h3 class="results-totals">Total votes: {{ count }}</h3>
    `,
    inputs: ['count']
})
export class ResultsTotalsComponent {
    count;
}