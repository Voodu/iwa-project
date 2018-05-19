import { Course } from '.';

export class Student {
    public id: number;
    public name: string;
    public surname: string;
    public faculty: string;
    public courses: Course[];

    public constructor(init?: Partial<Student>) {
        this.id = 0;
        this.name = this.surname = this.faculty = '';
        this.courses = [];
        Object.assign(this, init);
    }
}
