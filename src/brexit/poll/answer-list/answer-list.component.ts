import {Component, EventEmitter} from 'angular2/core';
import {MdButton} from '@angular2-material/button';
import {Answer} from '../answer';

@Component({
    selector: 'brexit-answer-list',
    template: `
        <style>
            :host {
                display: flex;
                flex-direction: column;
            }
            
            .vote-button { margin: 10px 0; }
            
            .vote-button.selected {
                background-color: #2196f3;
                color: white;
            }
        </style>
        <button md-raised-button
                *ngFor="let answer of answers"
                class="vote-button" 
                [class.selected]="answer.isSelected"
                (click)="selectAnswer(answer)">{{ answer.label }}</button>
    `,
    inputs: ['answers'],
    outputs: ['onAnswerChange:change'],
    directives: [MdButton]
})
export class AnswerListComponent {
    answers: Answer[];
    onAnswerChange: EventEmitter = new EventEmitter();

    selectAnswer(answer: Answer) {
        this.onAnswerChange.emit(answer);
    }
}