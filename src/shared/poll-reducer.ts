import {Answer} from '../brexit/poll/answer';
import {Poll} from '../brexit/poll/poll';
import {Reducer, Action} from '@ngrx/store';

export const SUCCESSFUL_ANSWER = (payload = { questionId: '', answerId: 0 }) => ({ type: 'SUCCESSFUL_ANSWER', payload});

const pollInitialState = {
    items: [
        new Poll({
            id: 'BREXIT',
            question: 'Should the United Kingdom remain a member of the European Union or leave the European Union?',
            answers: [
                new Answer({
                    id: 1,
                    label: 'Remain a member of the European Union',
                    isSelected: false
                }),
                new Answer({
                    id: 2,
                    label: 'Leave the European Union',
                    isSelected: false
                })
            ]
        })
    ]
};

export const polls: Reducer = (state = pollInitialState, action: Action) => {
    switch (action.type) {
        case 'SELECT_ANSWER':
            return state;

        case 'SUCCESSFUL_ANSWER':
            return Object.assign({}, state, {
                items: state.items.map(i => pollItem(i, action.payload))
            });

        default:
            return state;
    }
};


function pollItem (state, payload = { questionId: '', answerId: 0 }) {
    if (state.id !== payload.questionId) {
        return state;
    }

    return Object.assign({}, state, {
        answers: state.answers.map((a) => {
            a.isSelected = (a.id === payload.answerId);
            return a;
        })
    });
}
