import {Component, Inject} from 'angular2/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdButton} from '@angular2-material/button';
import {Router} from 'angular2/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {authSuccess} from '../shared/brexit.actions';
import {TEXTS} from '../config';

declare var __moduleName: string;

@Component({
    selector: 'brexit-intro',
    template: `
        <md-card class="intro-card">
            <p class="intro-card-text">{{ intro }}</p>
            <md-card-actions class="intro-card-actions">
                <button md-raised-button (click)="onClick()">Share your opinion</button>
            </md-card-actions>
        </md-card>
    `,
    moduleId: __moduleName,
    styleUrls: ['intro.css'],
    directives: [MD_CARD_DIRECTIVES, MdButton],
    providers: [AuthenticationService]
})
export class IntroComponent {

    intro: string;

    constructor(private _router: Router, private authenticationService: AuthenticationService,
                @Inject('BrexitStore') private store: any) {
        const initialState = this.store.getState();
        const isUserAuthenticated = initialState.user.isAuthenticated;
        this.intro = TEXTS.intro;

        if (isUserAuthenticated) {
            this.goToVote();
        }
    }

    onClick() {
        this.authenticationService.authenticate()
            .subscribe(
                (user) => {
                    this.store.dispatch(authSuccess(user.data));
                    this.goToVote();
                },
                (authErr) => { console.log('err ->', authErr); }
            );
    }

    private goToVote() {
        this._router.navigate(['Vote']);
    }
}
