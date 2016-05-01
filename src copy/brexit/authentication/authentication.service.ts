import {Injectable} from 'angular2/core';
import {Auth} from './auth';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

    private provider: string = 'twitter';
    constructor(private auth: Auth) {}

    authenticate () {
        return this.auth.authenticate(this.provider)
            .map(res => res.json())
            .catch(this.handleError.bind(this));
    }

    isAuthenticated () {
        return this.auth.isAuthenticated();
    }

    private handleError (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}