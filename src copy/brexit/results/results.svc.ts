import {Injectable} from 'angular2/core';
import {WEB_API, LOCALSTORAGE} from '../config';
import {Headers, RequestOptions, Response, Http} from 'angular2/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ResultsService {
    constructor(private http: Http, private authentication: AuthenticationService) {}

    getResults() {
        const URL = `${WEB_API.DOMAIN}${WEB_API.ENDPOINTS.RESULTS}`;
        const token = window.localStorage.getItem(LOCALSTORAGE.KEYS.TOKEN);
        const headers = new Headers({ 'Authorization': `Bearer ${token}` });
        const requestOptions = this.authentication.isAuthenticated() ? new RequestOptions({ headers }) : {};

        return this.http.get(URL, requestOptions)
            .map(res => res.json())
            .catch(this.handleError.bind(this));
    }

    private handleError (error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}