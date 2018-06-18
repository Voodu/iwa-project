export class CourseInfo {
    public id?: number;
    public name: string;
    public ECTS: number; // ECTS

    public constructor(init?: Partial<CourseInfo>) {
        this.ECTS = 0;
        this.name = 'no_data';
        Object.assign(this, init);
    }
}
