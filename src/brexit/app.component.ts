import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {IntroComponent} from './intro/intro.component';
import {PollComponent} from './poll/poll.component';
import {ResultsComponent} from './results/results.component';

@Component({
    selector: 'brexit',
    template: `
        <brexit-toolbar></brexit-toolbar>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES, ToolbarComponent]
})
@RouteConfig([
    { path: '/', name: 'Intro', component: IntroComponent },
    { path: '/vote', name: 'Vote', component: PollComponent },
    { path: '/results', name: 'Results', component: ResultsComponent }
])
export class AppComponent {}