import {Component} from 'angular2/core';
import {Store} from '@ngrx/store';
import {ToolbarComponent} from './toolbar/toolbar.component';

@Component({
    selector: 'brexit',
    template: `
        <brexit-toolbar></brexit-toolbar>
    `,
    directives: [ToolbarComponent]
})
export class AppComponent {

    constructor(public store: Store) {
    }
}