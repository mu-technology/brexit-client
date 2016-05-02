export class Answer {

    id: number;
    label: string;
    isSelected: boolean;

    constructor(answer) {
        this.id = parseInt(answer.id, 10) || 0;
        this.label = answer.label || '';
        this.isSelected = !!answer.isSelected;
    }
}