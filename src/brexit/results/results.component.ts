import {Component} from 'angular2/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';

@Component({
    selector: 'brexit-results',
    template: `
        <md-card>
            <md-card-title>Results</md-card-title>
        </md-card>
    `,
    directives: [MD_CARD_DIRECTIVES]
})
export class ResultsComponent {}