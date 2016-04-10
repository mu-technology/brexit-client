import 'rxjs/Rx';
import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import store from './brexit/shared/brexit.store';
import {AppComponent} from './brexit/app.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {Auth, AUTH_PROVIDERS} from './brexit/authentication/auth';
import {WEB_API} from './brexit/config';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    Auth,
    AUTH_PROVIDERS({
        providers: { twitter: {} },
        baseUrl: WEB_API.DOMAIN
    }),
    provide('BrexitStore', { useValue: store})
]);
