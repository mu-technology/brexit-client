import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {Angulartics2GoogleAnalytics} from 'angulartics2/src/providers/angulartics2-google-analytics';
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
    directives: [ROUTER_DIRECTIVES, ToolbarComponent],
    providers: [Angulartics2GoogleAnalytics]
})
@RouteConfig([
    { path: '/', name: 'Intro', component: IntroComponent },
    { path: '/vote', name: 'Vote', component: PollComponent },
    { path: '/results', name: 'Results', component: ResultsComponent }
])
export class AppComponent {
    constructor(public angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}
}