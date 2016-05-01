export class Vote {

    id: number;
    label: string;
    isSelected: boolean;

    constructor(vote) {
        this.id = vote.id || null;
        this.label = vote.label || '';
        this.isSelected = !!vote.isSelected;
    }
}