import { Grade } from './Grade.model';
import { Gradeable } from '../interfaces';
import { CourseInfo } from './CourseInfo.model';

export class Course implements Gradeable {
    public id!: number;
    public courseInfo: CourseInfo;

    public grade: number;
    public weight: number; // ECTS
    public courseGrades: Grade[];

    public constructor(init?: Partial<Course>) {
        this.weight = 0;
        this.courseInfo = new CourseInfo();
        this.courseGrades = [];
        this.weight = this.courseInfo.ECTS;
        Object.assign(this, init);
        if (this.courseInfo.ECTS !== 0) {
            this.weight = this.courseInfo.ECTS;
        }
        this.grade = this.avg();
    }

    private avg(): number {
        return this.courseGrades.reduce((a, g) => a + g.grade * g.weight, 0) /
            this.courseGrades.reduce((a, g) => a + g.weight, 0) || 0;
    }
}
