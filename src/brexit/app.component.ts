import {Component, Inject, OnDestroy} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Angulartics2GoogleAnalytics} from 'angulartics2/src/providers/angulartics2-google-analytics';
import {VoteComponent} from './vote/vote.component';
import {logout} from './shared/brexit.actions';
import {OneComponent} from './temp/one';
import {TwoComponent} from './temp/two';
import {Angulartics2} from 'angulartics2';
import {MdToolbar} from '@angular2-material/toolbar';

@Component({
    selector: 'brexit',
    template: `
    <md-toolbar color="primary">
        <span>Brexit</span>
    </md-toolbar>
    <router-outlet></router-outlet>
    `,
    directives: [VoteComponent, ROUTER_DIRECTIVES, MdToolbar],
    providers: [Angulartics2GoogleAnalytics]
})
@RouteConfig([
    { path: '/', name: 'Home', component: VoteComponent },
    { path: '/one', name: 'One', component: OneComponent },
    { path: '/two', name: 'Two', component: TwoComponent }
])
export class AppComponent implements OnDestroy {
    isAuthenticated: boolean;
    unsubscribe: Function;

    constructor(public angulartics2: Angulartics2, public angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
                @Inject('BrexitStore') private store: any) {
        this.unsubscribe = this.store.subscribe(() => {
            this.isAuthenticated = this.store.getState().user.isAuthenticated;
        });
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    logout() {
        this.store.dispatch(logout());
    }
}