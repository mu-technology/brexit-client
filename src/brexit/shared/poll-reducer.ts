import {Answer} from '../poll/answer';
import {Poll} from '../poll/poll';
import {Reducer, Action} from '@ngrx/store';

export const SUCCESSFUL_ANSWER = (payload = { questionId: '', answerId: 0 }) => ({ type: 'SUCCESSFUL_ANSWER', payload});

export interface Polls {
    items: Poll[];
}

const pollInitialState: Polls = {
    items: [
        new Poll({
            id: 'BREXIT',
            question: 'Should the United Kingdom remain a member of the European Union or leave the European Union?',
            answers: [
                new Answer({
                    id: 1,
                    label: 'Remain a member of the European Union',
                    shortLabel: 'Remain in the EU',
                    isSelected: false
                }),
                new Answer({
                    id: 2,
                    label: 'Leave the European Union',
                    shortLabel: 'Leave the EU',
                    isSelected: false
                })
            ]
        })
    ]
};

export const polls: Reducer<Polls> = (state = pollInitialState, action: Action) => {
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
