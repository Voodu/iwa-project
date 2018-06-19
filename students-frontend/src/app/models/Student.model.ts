import { Course } from './Course.model';

export class Student {
    public id?: number;
    public name: string;
    public surname: string;
    public faculty: string;
    public courses: Course[];

    public constructor(init?: Partial<Student>) {
        this.name = this.surname = this.faculty = 'no_data';
        this.courses = [];
        Object.assign(this, init);
    }
}
