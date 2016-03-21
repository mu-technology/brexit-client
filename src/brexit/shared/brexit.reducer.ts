import {combineReducers} from 'redux';

const initialState = {
    isLoading: false,
    items: [
        {
            id: 1,
            label: 'Should the United Kingdom remain a member of the European Union or leave the European Union?',
            answers: [
                {
                    id: 1,
                    label: 'Remain a member of the European Union',
                    isSelected: false,
                },
                {
                    id: 2,
                    label: 'Leave the European Union',
                    isSelected: false
                }
            ]
        }
    ]
};

const question = (state, action) => {
    switch (action.type) {
        case 'VOTE_SUCCESSFUL':

            if (state.id !== action.questionId) {
                return state;
            }
            return Object.assign({}, state, {
                answers: state.answers.map((a) => {
                    //noinspection TypeScriptUnresolvedVariable
                    a.isSelected = (a.id === action.answerId);
                    return a;
                })
            });
        default:
            return state;
    }
};

const questions = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBMIT_VOTE':
            return Object.assign({}, state, {
                isLoading: true
            });
        case 'VOTE_SUCCESSFUL':
            return Object.assign({}, state, {
                items: state.items.map(q => question(q, action)),
                isLoading: false
            });
        default:
            return state;
    }
};

const userInitialState = {
    data: {},
    isAuthenticated: !!window.localStorage.getItem('brexit_token')
};

const user = (state = userInitialState, action) => {
    switch (action.type) {
        case 'AUTHENTICATE_USER':
            return state;
        case 'AUTH_SUCCESSFUL':
            return Object.assign({}, state, {
                data: action.data,
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

const brexitReducer = combineReducers({
    questions,
    user
});
export default brexitReducer;