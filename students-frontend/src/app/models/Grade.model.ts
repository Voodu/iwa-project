import { Gradeable } from '../interfaces';

export class Grade implements Gradeable {
    public id?: number;
    public grade: number;
    public weight: number;

    public constructor(init?: Partial<Grade>) {
        this.grade = this.weight = 0;
        Object.assign(this, init);
    }
}
