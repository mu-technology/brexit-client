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
            .nvtooltip .xytooltip {
                background: red !important;
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
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: (d) => d.label,
                y: (d) => d.value,
                showValues: true,
                valueFormat: (d) => d3.format(',.4f')(d),
                duration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -10
                }
            }
        };

        this.data = [
            {
                'label' : 'A' ,
                'value' : 30
            } ,
            {
                'label' : 'B' ,
                'value' : 1
            } ,
            {
                'label' : 'C' ,
                'value' : 29
            } ,
            {
                'label' : 'D' ,
                'value' : 10
            } ,
            {
                'label' : 'E' ,
                'value' : 5
            } ,
            {
                'label' : 'F' ,
                'value' : 15
            } ,
            {
                'label' : 'G' ,
                'value' : 3
            } ,
            {
                'label' : 'H' ,
                'value' : 7
            }
        ];
    }
}