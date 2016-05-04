export class Answer {

    id: number;
    label: string;
    shortLabel: string;
    isSelected: boolean;

    constructor(answer) {
        this.id = parseInt(answer.id, 10) || 0;
        this.label = answer.label || '';
        this.shortLabel = answer.shortLabel || '';
        this.isSelected = !!answer.isSelected;
    }
}