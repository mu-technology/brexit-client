import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions, Response} from 'angular2/http';
import {WEB_API, LOCALSTORAGE} from '../config';
import {Answer} from './answer';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PollService {

    constructor(private http: Http) {}

    postAnswer(answer: Answer) {
        const URL = `${WEB_API.DOMAIN}${WEB_API.ENDPOINTS.VOTE}`;
        const requestOptions = this.getRequestOptions();

        return this.http
            .post(URL, JSON.stringify({ vote: answer }), requestOptions)
            .map(res => res.json().vote)
            .catch(this.handleError.bind(this));
    }

    getUserAnswer() {
        const URL = `${WEB_API.DOMAIN}${WEB_API.ENDPOINTS.VOTE}`;
        const requestOptions = this.getRequestOptions();

        return this.http.get(URL, requestOptions)
            .map(res => new Answer(res.json().vote))
            .catch(this.handleError.bind(this));
    }

    private getRequestOptions() {
        const token = window.localStorage.getItem(LOCALSTORAGE.KEYS.TOKEN);
        const headers = new Headers({ 'Authorization': `Bearer ${token}`});
        return new RequestOptions({ headers });
    }

    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}