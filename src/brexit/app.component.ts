import {Component, Inject} from 'angular2/core';
import {HeaderComponent} from './header/header.component';
import {VoteComponent} from './vote/vote.component';
import {logout} from './shared/brexit.actions';

@Component({
    selector: 'brexit',
    template: `
    <header></header>
    <vote></vote>
    <button (click)="logout()">Log out</button>
    `,
    directives: [HeaderComponent, VoteComponent]
})
export class AppComponent {


    constructor(@Inject('BrexitStore') private store: any) {}

    logout() {
        this.store.dispatch(logout());
    }
}