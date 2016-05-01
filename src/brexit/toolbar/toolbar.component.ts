import {Component} from 'angular2/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {LogoutComponent} from '../logout/logout.component';

@Component({
    selector: 'brexit-toolbar',
    template: `
        <style>
            .toolbar { margin-bottom: 20px; }
            .fill-space { flex: 1 1 auto; }
        </style>
        <md-toolbar color="primary" class="toolbar">
            <span>Brexit</span>
            <span class="fill-space"></span>
            <logout></logout>
        </md-toolbar>
    `,
    directives: [LogoutComponent, MdToolbar]
})
export class ToolbarComponent {}