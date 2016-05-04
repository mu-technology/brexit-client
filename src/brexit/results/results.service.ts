import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {BackendRequestService} from '../../shared/backend-request.service';
import {WEB_API} from '../config';

@Injectable()
export class ResultsService extends BackendRequestService {

    constructor(private http: Http) {
        super();
    }

    getResults() {
        const URL = `${WEB_API.DOMAIN}${WEB_API.ENDPOINTS.RESULTS}`;
        const requestOptions = this.getRequestOptions();

        return this.http
            .get(URL, requestOptions)
            .map(res => res.json())
            .catch(this.handleError.bind(this));
    }
}