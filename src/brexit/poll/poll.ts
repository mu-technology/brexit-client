import {Answer} from './answer';

export class Poll {

    id: string;
    question: string;
    answers: Answer[];

    constructor(poll) {
        this.id = poll.id || '';
        this.question = poll.question || '';
        this.answers = poll.answers || [];
    }
}