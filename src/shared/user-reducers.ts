import {Reducer, Action} from '@ngrx/store';

export const LOGOUT = <Action>{ type: 'LOGOUT' };

const userInitialState = {
    data: {},
    isAuthenticated: !!window.localStorage.getItem('brexit_token')
};

export const user: Reducer = (state = userInitialState, action: Action) => {
    switch (action.type) {
        case 'AUTHENTICATE_USER':
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