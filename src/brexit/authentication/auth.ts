import {Injectable, Injector, provide} from 'angular2/core';
import {Http} from 'angular2/http';
import {Shared} from './shared';
import {Oauth} from './oauth';
import {Popup} from './popup';
import {Oauth1} from './oauth1';
import {Storage} from './storage';
import {Config, ICustomConfig} from './config';

export function AUTH_PROVIDERS(config: ICustomConfig) {
    return [
        provide(Config, { useFactory: () => { return new Config(config); } }),
        provide(Storage, { useFactory: (providedConfig) => { return new Storage(providedConfig); }, deps: [Config] }),
        provide(Shared, { useFactory: (storage, providedConfig) => { return new Shared(storage, providedConfig); },
            deps: [Storage, Config] }),
        provide(Oauth, { useFactory: (injector, shared, providedConfig) => { return new Oauth(injector, shared, providedConfig); },
            deps: [Injector, Shared, Config] } ),
        provide(Popup, { useFactory: (providedConfig) => { return new Popup(providedConfig); }, deps: [Config] }),
        provide(Oauth1, { useFactory: (http, popup, providedConfig) => { return new Oauth1(http, popup, providedConfig); },
            deps: [Http, Popup, Config]} ),
        provide(Auth, { useFactory: (oauth, shared) => { return new Auth(oauth, shared); }, deps: [Oauth, Shared] })
    ];
}

@Injectable()
export class Auth {

    constructor (private oauth: Oauth, private shared: Shared) {

    }

    authenticate (name: string, userData?: any) {
        return this.oauth.authenticate(name, userData);
    }

    isAuthenticated () {
        return this.shared.isAuthenticated();
    }
}