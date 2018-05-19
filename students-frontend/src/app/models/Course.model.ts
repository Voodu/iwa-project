import { Grade } from './Grade.model';
import { Gradeable } from '../interfaces';

export class Course implements Gradeable {
    public id: number;
    public name: string;
    public grade: number;
    public weight: number; // ECTS
    public courseGrades: Grade[];

    public constructor(init?: Partial<Course>) {
        this.id = this.weight = 0;
        this.name = 'no_data';
        this.courseGrades = [];
        Object.assign(this, init);
        this.grade = this.avg();
    }

    private avg(): number {
        return this.courseGrades.reduce((a, g) => a + g.grade * g.weight, 0) /
            this.courseGrades.reduce((a, g) => a + g.weight, 0) || 0;
    }
}
