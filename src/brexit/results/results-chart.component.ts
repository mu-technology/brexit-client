import {Component, OnInit} from 'angular2/core';
import {nvD3} from 'ng2-nvd3';
import 'nvd3';
declare var d3: any;

@Component({
    selector: 'results-chart',
    template: `
        <div>
            <nvd3 [options]="options" [data]="data"></nvd3>    
        </div>
    `,
    directives: [nvD3],
    inputs: ['data']
})
export class ResultsChartComponent implements OnInit {
    options;
    data;

    ngOnInit() {
        this.options = {
            chart: {
                type: 'pieChart',
                height: 450,
                x: (d) => d.label,
                y: (d) => d.value,
                valueFormat: (d) => d3.format('%')(d)
            }
        };
    }
}