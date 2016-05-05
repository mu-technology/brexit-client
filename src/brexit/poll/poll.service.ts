import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {WEB_API} from '../config';
import {Answer} from './answer';
import {BackendRequestService} from '../shared/backend-request.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class PollService extends BackendRequestService {

    constructor(private http: Http) {
        super();
    }

    postAnswer(answer: Answer): Observable<Answer> {
        const URL = `${WEB_API.DOMAIN}${WEB_API.ENDPOINTS.VOTE}`;
        const requestOptions = this.getRequestOptions();

        return this.http
            .post(URL, JSON.stringify({ vote: answer }), requestOptions)
            .map(res => new Answer(res.json().vote))
            .catch(this.handleError.bind(this));
    }

    getUserAnswer(): Observable<Answer> {
        const URL = `${WEB_API.DOMAIN}${WEB_API.ENDPOINTS.VOTE}`;
        const requestOptions = this.getRequestOptions();

        return this.http
            .get(URL, requestOptions)
            .map(res => new Answer(res.json().vote))
            .catch(this.handleError.bind(this));
    }
}