import {Injectable} from 'angular2/core';

export interface IPopupOptions {
    width?: number;
    height?: number;
    left?: number;
    top?: number;
}

export interface IOauth1Options {
    url?: string;
    name?: string;
    popupOptions?: IPopupOptions;
    redirectUri?: string;
    authorizationEndpoint?: string;
    type?: string;
}

export interface IOauth2Options extends IOauth1Options {
    state?: string| (() => string);
    defaultUrlParams?: string[];
    responseType?: string;
    responseParams?: {
        code?: string;
        clientId?: string;
        redirectUri?: string;
    };
    clientId?: string;
    scopeDelimiter?: string;
    scopePrefix?: string;

    requiredUrlParams?: string[];
    optionalUrlParams?: string[];
    scope?: string[];
    display?: string;
}
export interface IProviders {
    [provider: string]: IOauth2Options;
}
export interface ICustomConfig {
    tokenRoot?: string;
    cordova?: boolean;
    baseUrl?: string;
    loginUrl?: string;
    signupUrl?: string;
    unlinkUrl?: string;
    tokenName?: string;
    tokenPrefix?: string;
    authToken?: string;
    storageType?: string;
    providers?: IProviders;
}
@Injectable()
export class Config implements ICustomConfig {

    constructor(config?: ICustomConfig) {
        Object.keys(config).forEach((key) => {
            if (key !== 'providers') {
                this[key] = config[key];
            } else {
                Object.keys(config[key]).forEach((provider) => {
                    if (typeof this.providers[provider] === 'undefined') {
                        this.providers[provider] = config.providers[provider];
                    } else {
                        Object.keys(config.providers[provider]).forEach((prop) => {
                            this.providers[provider][prop] = config.providers[provider][prop];
                        });
                    }
                });
            }
        });
    }

    tokenRoot: any = null;
    cordova: boolean = false;
    baseUrl: string = '/';
    loginUrl: string = '/auth/login';
    signupUrl: string = '/auth/signup';
    unlinkUrl: string = '/auth/unlink/';
    tokenName: string = 'token';
    tokenPrefix: string = 'brexit';
    authHeader: string = 'Authorization';
    authToken: string = 'Bearer';
    storageType: string = 'localStorage';
    providers: IProviders = {
        twitter: {
            name: 'twitter',
            url: '/auth/twitter',
            authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
            redirectUri: window.location.origin,
            type: '1.0',
            popupOptions: {width: 495, height: 645}
        }
    };
}