import {Reducer, Action} from '@ngrx/store';

export const LOGOUT = () => <Action>{ type: 'LOGOUT' };
export const AUTH_START = () => <Action>{ type: 'AUTH_START'};
export const AUTH_SUCCESS = (payload) => <Action>{ type: 'AUTH_SUCCESSFUL', payload };

const userInitialState = {
    data: {},
    isAuthenticated: !!window.localStorage.getItem('brexit_token')
};

export const user: Reducer = (state = userInitialState, action: Action) => {
    switch (action.type) {
        case 'AUTH_START':
            return state;

        case 'AUTH_SUCCESSFUL':
            return Object.assign({}, state, {
                data: action.payload,
                isAuthenticated: true
            });

        case 'LOGOUT':
            window.localStorage.removeItem('brexit_token');

            return Object.assign({}, state, {
                data: {},
                isAuthenticated: false
            });

        default:
            return state;
    }
};