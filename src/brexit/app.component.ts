import {Component, Inject, OnDestroy} from 'angular2/core';
import {HeaderComponent} from './header/header.component';
import {VoteComponent} from './vote/vote.component';
import {logout} from './shared/brexit.actions';

@Component({
    selector: 'brexit',
    template: `
    <header></header>
    <div class="main-container with-background">
        <vote class="vote"></vote>
    </div>
    <button *ngIf="isAuthenticated"
            (click)="logout()">Log out</button>
    `,
    directives: [HeaderComponent, VoteComponent]
})
export class AppComponent implements OnDestroy {
    isAuthenticated: boolean;
    unsubscribe: Function;

    constructor(@Inject('BrexitStore') private store: any) {

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