import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {Auth, AUTH_PROVIDERS} from './brexit/authentication/auth';
import {Angulartics2} from 'angulartics2/index';
import {provideStore} from '@ngrx/store';
import {loggerMiddleware} from 'ngrx-store-logger';
import {AppComponent} from './brexit/app.component';
import {user} from './brexit/shared/user-reducer';
import {polls} from './brexit/shared/poll-reducer';
import {WEB_API} from './brexit/config';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    Angulartics2,
    provideStore({user, polls}),
    loggerMiddleware(),
    Auth,
    AUTH_PROVIDERS({
        providers: { twitter: {} },
        baseUrl: WEB_API.DOMAIN
    }),
]).then(
    () => console.log('Brexit is running...'),
    () => console.error('Error running Brexit...')
);