import {User} from './user-reducer';
import {Polls} from './poll-reducer';

export interface AppStore {
    user: User;
    polls: Polls;
}