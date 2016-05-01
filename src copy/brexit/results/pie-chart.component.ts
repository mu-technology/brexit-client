import {Component, Inject, ElementRef} from 'angular2/core';
declare var d3, nv: any;

@Component({
    selector: 'pie-chart',
    template: '<div id="chart"></div>',
    inputs: ['data']
})
export class PieChartComponent {
    private el: any;
    private chart;
    private svg;
    private data;

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        this.el = elementRef.nativeElement;

        this.createGraph();
    }

    createGraph() {
        console.log('this.data', this.data);
        nv.addGraph(() => {
            this.chart = nv.models.pieChart()
                .x(d => d.label)
                .y(d => d.value)
                .showLabels(false);

            this.svg = d3.select(this.el).append('svg');
            this.svg.attr('height', '300px').style({ height: '300px' });
            this.svg.attr('width', '300px').style({ width: '300px' });
            this.svg.datum(this.data).call(this.chart);

            return this.chart;
        });
    }
}