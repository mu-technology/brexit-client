import {Answer} from './answer';

export class Poll {

    id: number;
    question: string;
    answers: Answer[];

    constructor(poll) {
        this.id = poll.id || null;
        this.question = poll.question || '';
        this.answers = poll.answers || [];
    }
}