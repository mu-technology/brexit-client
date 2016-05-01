import {Component, Inject, OnDestroy} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Angulartics2GoogleAnalytics} from 'angulartics2/src/providers/angulartics2-google-analytics';
import {VoteComponent} from './vote/vote.component';
import {logout} from './shared/brexit.actions';
import {Angulartics2} from 'angulartics2';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {IntroComponent} from './intro/intro.component';
import {ResultsComponent} from './results/results.component';

@Component({
    selector: 'brexit',
    template: `
    <style>
        .toolbar { margin-bottom: 20px; }
        .fill-space { flex: 1 1 auto; }
        .logout-btn { color: white; }
    </style>
    <md-toolbar color="primary" class="toolbar">
        <span>Brexit</span>
        <span class="fill-space"></span>
        <button class="logout-btn" md-button *ngIf="isAuthenticated" (click)="logout()">Logout</button>
    </md-toolbar>
    <router-outlet></router-outlet>
    `,
    directives: [IntroComponent, VoteComponent, ROUTER_DIRECTIVES, MdToolbar, MdButton],
    providers: [Angulartics2GoogleAnalytics]
})
@RouteConfig([
    { path: '/', name: 'Intro', component: IntroComponent },
    { path: '/vote', name: 'Vote', component: VoteComponent },
    { path: '/results', name: 'Results', component: ResultsComponent }
])
export class AppComponent implements OnDestroy {
    isAuthenticated: boolean;
    unsubscribe: Function;

    constructor(public angulartics2: Angulartics2, public angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
                private _router: Router, @Inject('BrexitStore') private store: any) {
        this.unsubscribe = this.store.subscribe(() => {
            this.isAuthenticated = this.store.getState().user.isAuthenticated;
        });
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    logout() {
        this.store.dispatch(logout());
        this._router.navigate(['Intro']);
    }
}