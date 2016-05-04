import {Component} from 'angular2/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {Store} from '@ngrx/store';
import {ResultsChartComponent} from './results-chart.component';
import {ResultsService} from './results.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/zip';

declare var d3: any;

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
            <results-chart [data]="results"></results-chart> 
        </md-card>
    `,
    directives: [MD_CARD_DIRECTIVES, ResultsChartComponent],
    providers: [ResultsService]
})
export class ResultsComponent {
    private results: Array<any>;

    constructor(private resultsService: ResultsService, private store: Store) {
        const brexitPollAnswers$: Observable<any> = this.store
            .select('polls')
            .concatMap(p => p.items)
            .filter(p => p.id === 'BREXIT')
            .map(p => p.answers);

        const results$: Observable<any> = this.resultsService.getResults();

        const source$ = Observable.zip(
            brexitPollAnswers$,
            results$,
            (s1, s2) => ({ answers: s1, results: s2 })
        );

        source$
            .subscribe((val) => {
                const { answers, results } = val;

                this.results = results.votes
                    .map(v => ({
                        label: answers.find(a => a.id === v.id).shortLabel,
                        value: v.count / results.total
                    }));
            });
    }
}