import {Component} from 'angular2/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {ResultsService} from './results.svc';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
    selector: 'brexit-results',
    template: `
        <md-card>
            <md-card-title>Results</md-card-title>
            <pie-chart data="data"></pie-chart>
        </md-card>
    `,
    providers: [ResultsService, AuthenticationService],
    directives: [MD_CARD_DIRECTIVES]
})
export class ResultsComponent {
    private data;
    constructor(private resultsService: ResultsService) {
        this.resultsService.getResults()
            .subscribe(
                (data) => {
                    console.log('data', data);
                    this.data = data;
                },
                (err) => {
                    console.log('err', err);
                }
            );
    }
}