import {Component} from 'angular2/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {Store} from '@ngrx/store';
import {ResultsService} from './results.service';
import {AppStore} from '../shared/store';
import {Answer} from '../poll/answer';
import {Observable} from 'rxjs/Observable';
import {Polls} from '../shared/poll-reducer';
import {Poll} from '../poll/poll';
import 'rxjs/add/observable/zip';
import {ResultsChartComponent} from './results-chart.component';

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
    results: Array<any>;

    constructor(private resultsService: ResultsService, private store: Store<AppStore>) {
        const brexitPollAnswers$: Observable<Answer[]> = this.store
            .select('polls')
            .concatMap((p: Polls) => p.items)
            .filter((p: Poll) => p.id === 'BREXIT')
            .map((p: Poll) => p.answers);

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