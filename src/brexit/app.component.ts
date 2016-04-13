import {Component, Inject, OnDestroy} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Angulartics2GoogleAnalytics} from 'angulartics2/src/providers/angulartics2-google-analytics';
import {HeaderComponent} from './header/header.component';
import {VoteComponent} from './vote/vote.component';
import {logout} from './shared/brexit.actions';
import {OneComponent} from './temp/one';
import {TwoComponent} from './temp/two';
import {Angulartics2} from 'angulartics2';

@Component({
    selector: 'brexit',
    template: `
    <nav>
        <a [routerLink]="['Home']">Home</a>
        <a [routerLink]="['One']">One</a>
        <a [routerLink]="['Two']">Two</a>
    </nav>
    <router-outlet></router-outlet>
    `,
    directives: [HeaderComponent, VoteComponent, ROUTER_DIRECTIVES],
    providers: [Angulartics2GoogleAnalytics]
})
@RouteConfig([
    { path: '/', name: 'Home', component: OneComponent },
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