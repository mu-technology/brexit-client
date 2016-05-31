import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {User, AUTH_START, AUTH_SUCCESS} from '../shared/user-reducer';
import {TEXTS} from '../config';
import {Auth} from '../authentication/auth';
import {AppStore} from '../shared/store';

@Component({
    selector: 'brexit-intro',
    template: `
        <style>
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .intro-card { padding: 40px; }
            .intro-card-text {
                text-align: justify;
                line-height: 30px;
            }
            .intro-card-actions {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .intro-card-actions button:hover {
                background: #2196f3;
                color: white;
            }
            @media only screen and (min-width: 668px){
                .intro-card {
                    width: 50%;
                }
            }
        </style>
        <md-card class="intro-card">
            <p class="intro-card-text">{{ intro }}</p>
            <md-card-actions class="intro-card-actions">
                <button md-raised-button (click)="authenticateUser()">Share your opinion</button>
            </md-card-actions>
        </md-card>
    `,
    directives: [MdButton, MD_CARD_DIRECTIVES]
})
export class IntroComponent {
    intro: string = TEXTS.INTRO;
    private isAuthenticated: boolean;

    constructor(private auth: Auth, private router: Router, private store: Store<AppStore>) {
        const user$: Observable<User> = this.store.select('user');

        user$
            .subscribe(u => {
                this.isAuthenticated = u.isAuthenticated;
            });
    }

    authenticateUser() {
        if (this.isAuthenticated) {
            this.goToVote();
        } else {
            this.store.dispatch(AUTH_START());

            this.auth.authenticate('twitter')
                .map(res => res.json())
                .subscribe((user) => {
                    if (user.data) {
                        this.store.dispatch(AUTH_SUCCESS(user.data));

                        this.goToVote();
                    }
                });
        }
    }

    private goToVote() {
        this.router.navigate(['Vote']);
    }
}