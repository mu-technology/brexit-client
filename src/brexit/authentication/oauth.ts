import {Injectable, Injector} from 'angular2/core';
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Config} from './config';
import {Oauth1} from './oauth1';
import {Shared} from './shared';

@Injectable()
export class Oauth {
    constructor(private injector: Injector,
        private shared: Shared,
        private config: Config) {}

    authenticate(name: string, userData?: any): Observable<Response> {
        const provider: Oauth1 = this.injector.get(Oauth1);

        return provider.open(this.config.providers[name], userData || {})
            .map((response: Response) => {
                // this is for a scenario when someone wishes to opt out from
                // satellizer's magic by doing authorization code exchange and
                // saving a token manually.
                if (this.config.providers[name].url) {
                    this.shared.setToken(response);
                }
                return response;
            });
    }
}