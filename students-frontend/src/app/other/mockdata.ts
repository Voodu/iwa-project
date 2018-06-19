import { Student, Course, Grade, CourseInfo } from '../models';

export const STUDENTS: Student[] = [
    new Student(
        {
            name: 'Jan',
            surname: 'MOCK',
            faculty: 'WEEIA',
            courses: [
                new Course({
                    courseInfo: new CourseInfo({
                        name: 'Mathematics',
                        ECTS: 6
                    }),
                    weight: 3,
                    courseGrades: [
                        new Grade({ grade: 5, weight: 2 }),
                        new Grade({ grade: 3.5, weight: 1 }),
                        new Grade({ grade: 4.5, weight: 3 })
                    ]
                }),
                new Course({
                    courseInfo: new CourseInfo({
                        name: 'Physics',
                        ECTS: 6
                    }),
                    weight: 3,
                    courseGrades: [
                        new Grade({ grade: 5, weight: 2 }),
                        new Grade({ grade: 4.5, weight: 1 }),
                        new Grade({ grade: 3.5, weight: 3 }),
                        new Grade({ grade: 5, weight: 1 })
                    ]
                })
            ]
        }),
    new Student(
        {
            name: 'Anna',
            surname: 'MOCK',
            faculty: 'FTIMS',
            courses: [
                new Course({
                    courseInfo: new CourseInfo({
                        name: 'Sports',
                        ECTS: 6
                    }),
                    weight: 3,
                    courseGrades: [
                        new Grade({ grade: 3, weight: 2 }),
                        new Grade({ grade: 3.5, weight: 1 }),
                        new Grade({ grade: 3.5, weight: 3 })
                    ]
                }),
                new Course({
                    courseInfo: new CourseInfo({
                        name: 'OOP',
                        ECTS: 6
                    }),
                    weight: 3,
                    courseGrades: [
                        new Grade({ grade: 5, weight: 2 }),
                        new Grade({ grade: 4.5, weight: 3 }),
                        new Grade({ grade: 5, weight: 3 }),
                        new Grade({ grade: 5, weight: 2 })
                    ]
                })
            ]
        }),
    new Student(
        {
            name: 'Mateusz',
            surname: 'MOCK',
            faculty: 'BINOŻ',
            courses: [
                new Course({
                    courseInfo: new CourseInfo({
                        name: 'Mathematics',
                        ECTS: 6
                    }),
                    weight: 3,
                    courseGrades: [
                        new Grade({ grade: 5, weight: 2 }),
                        new Grade({ grade: 3.5, weight: 1 }),
                        new Grade({ grade: 4.5, weight: 3 })
                    ]
                }),
                new Course({
                    courseInfo: new CourseInfo({
                        name: 'Biology',
                        ECTS: 6
                    }),
                    weight: 3,
                    courseGrades: [
                        new Grade({ grade: 3.5, weight: 2 }),
                        new Grade({ grade: 3.5, weight: 3 }),
                        new Grade({ grade: 2, weight: 3 })
                    ]
                }),
                new Course({
                    courseInfo: new CourseInfo({
                        name: 'Chemistry',
                        ECTS: 6
                    }),
                    weight: 3,
                    courseGrades: [
                        new Grade({ grade: 5, weight: 2 }),
                        new Grade({ grade: 5, weight: 1 })
                    ]
                })
            ]
        })
];
