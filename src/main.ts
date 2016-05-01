import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './brexit/app.component';
import {provideStore} from '@ngrx/store';
import {loggerMiddleware} from 'ngrx-store-logger';
import {user} from './shared/user-reducers';

bootstrap(AppComponent, [
    provideStore({user}),
    loggerMiddleware()
]).then(
    () => console.log('Brexit is running...'),
    () => console.error('Error running Brexit...')
);