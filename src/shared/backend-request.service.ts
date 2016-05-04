import {LOCALSTORAGE} from '../brexit/config';
import {Headers, RequestOptions, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

export class BackendRequestService {

    public getRequestOptions() {
        const token = window.localStorage.getItem(LOCALSTORAGE.KEYS.TOKEN);
        const headers = new Headers({ 'Authorization': `Bearer ${token}`});

        return new RequestOptions({ headers });
    }

    public handleError (error: Response) {
        console.error(error);

        return Observable.throw(error.json().error || 'Server error');
    }
}