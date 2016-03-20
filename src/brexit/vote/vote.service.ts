import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Vote} from './vote';
import {AuthenticationService} from '../authentication/authentication.service';

import {WEB_API, LOCALSTORAGE} from '../config';
const UNAUTHORIZED = 401;

@Injectable()
export class VoteService {

    constructor(private http: Http, private authentication: AuthenticationService) {}

    postVote (vote: Vote) {
        const URL = `${WEB_API.DOMAIN}${WEB_API.ENDPOINTS.VOTE}`;
        const token = window.localStorage.getItem(LOCALSTORAGE.KEYS.TOKEN);
        const headers = new Headers({ 'Authorization': `Bearer ${token}` });
        const requestOptions = this.authentication.isAuthenticated() ? new RequestOptions({ headers }) : {};

        return this.http.post(URL, JSON.stringify({ vote }), requestOptions)
            .map(res => res.json().vote)
            .catch(this.handleError.bind(this));
    }

    getVote () {
        const URL = `${WEB_API.DOMAIN}${WEB_API.ENDPOINTS.VOTE}`;
        const token = window.localStorage.getItem(LOCALSTORAGE.KEYS.TOKEN);
        const headers = new Headers({ 'Authorization': `Bearer ${token}` });
        const requestOptions = this.authentication.isAuthenticated() ? new RequestOptions({ headers }) : {};

        return this.http.get(URL, requestOptions)
            .map(res => res.json().vote)
            .catch(this.handleError.bind(this));
    }

    private handleError (error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        if (error.status === UNAUTHORIZED) {
            this.authentication.authenticate()
                .subscribe(
                    (data) => {
                        console.log('data', data);
                        const vote = new Vote(JSON.parse(window.localStorage.getItem('brexit_vote')));
                        console.log('vote 11', vote);
                        this.postVote(vote)
                            .subscribe(
                                (response) => { console.log('response', response); },
                                (err) => { console.log('err ->', err); }
                            );
                    },
                    (err) => { console.log('err ->', err); }
                );
        }
        return Observable.throw(error.json().error || 'Server error');
    }
}