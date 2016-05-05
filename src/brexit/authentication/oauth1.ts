import {Injectable} from 'angular2/core';
import {Popup} from './popup';
import {Http, Response} from 'angular2/http';
import {joinUrl} from './utils';
import {Config, IOauth1Options} from './config';
import 'rxjs/add/operator/concatMap';

@Injectable()
export class Oauth1 {

    private static base: IOauth1Options = {
        url: null,
        name: null,
        popupOptions: null,
        redirectUri: null,
        authorizationEndpoint: null
    };

    private defaults: IOauth1Options;

    constructor(private http: Http, private popup: Popup, private config: Config) {}

    open(options?: IOauth1Options, userData?: any) {

        this.defaults = Object.assign({}, Oauth1.base, options);

        let popupWindow;

        let serverUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;

        if (!this.config.cordova) {
            popupWindow = this.popup.open('', this.defaults.name, this.defaults.popupOptions/*, this.defaults.redirectUri*/);
        }

        return this.http.post(serverUrl, JSON.stringify(this.defaults))
            .concatMap((response: Response) => {
                if (this.config.cordova) {
                    popupWindow = this.popup.open(
                        [this.defaults.authorizationEndpoint, this.buildQueryString(response.json())].join('?'),
                        this.defaults.name,
                        this.defaults.popupOptions);
                } else {
                    popupWindow.popupWindow.location =
                        [this.defaults.authorizationEndpoint, this.buildQueryString(response.json())].join('?');
                }

                return this.config.cordova ? popupWindow.eventListener(this.defaults.redirectUri) : popupWindow.pollPopup();
            })
            .concatMap((response) => {
                return this.exchangeForToken(response, userData);
            });
    }

    private exchangeForToken(oauthData, userData?: any) {
        let data = Object.assign({}, userData, oauthData);
        let exchangeForTokenUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        return this.http.post(exchangeForTokenUrl, JSON.stringify(data));
    }

    private buildQueryString(obj: Object) {
        return Object.keys(obj).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }).join('&');
    }
}