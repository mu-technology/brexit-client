import {Component} from 'angular2/core';
import {MdButton} from '@angular2-material/button';
import {Store, Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'logout',
    template: `
        <style>
            .logout-btn { color: white; }
        </style>
        <button md-button class="logout-btn" *ngIf="isUserAuthenticated" (click)="logout()">Logout</button>
    `,
    directives: [MdButton]
})
export class LogoutComponent {
    private isUserAuthenticated: boolean;
    private user: Observable;

    constructor(private store: Store) {
        this.user = this.store.select('user');

        this.user
            .subscribe((user) => {
                this.isUserAuthenticated = user.isAuthenticated;
            });
    }

    logout() {
        this.store.dispatch(<Action>{ type: 'LOGOUT' });
    }
}