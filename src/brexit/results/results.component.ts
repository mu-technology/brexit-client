import {Component} from 'angular2/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';

@Component({
    selector: 'brexit-results',
    template: `
        <style>
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .results-card-title { text-align: center; }
            
            @media only screen and (min-width: 668px){
                .results-card { width: 50%; }
            }
        </style>
        <md-card class="results-card">
            <md-card-title class="results-card-title">Results</md-card-title>
        </md-card>
    `,
    directives: [MD_CARD_DIRECTIVES]
})
export class ResultsComponent {}