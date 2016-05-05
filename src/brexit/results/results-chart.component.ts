import {Component, OnInit, ViewEncapsulation} from 'angular2/core';
import {nvD3} from 'ng2-nvd3';
import 'nvd3';
declare var d3: any;

@Component({
    selector: 'results-chart',
    encapsulation: ViewEncapsulation.Native,
    template: `
        <style>

            .nvd3.nv-pie .nv-label text {
                fill: white !important;
                font-size: 12px;
            }

            @media only screen and (min-width: 668px) {
                .nvd3.nv-pie .nv-label text {
                    font-size: 18px;
                }
            }
        </style>
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