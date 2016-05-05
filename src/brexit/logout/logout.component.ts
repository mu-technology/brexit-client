import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {MdButton} from '@angular2-material/button';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {LOGOUT, User} from '../shared/user-reducer';
import {AppStore} from '../shared/store';

@Component({
    selector: 'logout',
    template: `
        <style>
            .logout-btn { color: white; }
        </style>
        <button md-button
            *ngIf="isUserAuthenticated" 
            class="logout-btn"
            (click)="logout()">Logout</button>
    `,
    directives: [MdButton]
})
export class LogoutComponent {
    isUserAuthenticated: boolean = true;

    constructor(private router: Router, private store: Store<AppStore>) {
        const user$: Observable<User> = this.store.select('user');

        user$
            .subscribe((u) => {
                this.isUserAuthenticated = u.isAuthenticated;
            });
    }

    logout() {
        this.store.dispatch(LOGOUT());
        this.goToIntro();
    }

    private goToIntro() {
        this.router.navigate(['Intro']);
    }
}