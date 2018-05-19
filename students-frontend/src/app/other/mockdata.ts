import { Student, Course, Grade } from '../models';

export const STUDENTS: Student[] = [
    new Student(
        {
            name: 'Jan',
            surname: 'MOCK',
            faculty: 'WEEIA',
            courses: [
                new Course({
                    name: 'Maths',
                    weight: 3,
                    courseGrades: [
                        new Grade({ grade: 5, weight: 2 }),
                        new Grade({ grade: 3.5, weight: 1 }),
                        new Grade({ grade: 4.5, weight: 3 })
                    ]
                }),
                new Course({
                    name: 'Physics',
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
                    name: 'Sports',
                    weight: 3,
                    courseGrades: [
                        new Grade({ grade: 3, weight: 2 }),
                        new Grade({ grade: 3.5, weight: 1 }),
                        new Grade({ grade: 3.5, weight: 3 })
                    ]
                }),
                new Course({
                    name: 'OOP',
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
                    name: 'Maths',
                    weight: 3,
                    courseGrades: [
                        new Grade({ grade: 5, weight: 2 }),
                        new Grade({ grade: 3.5, weight: 1 }),
                        new Grade({ grade: 4.5, weight: 3 })
                    ]
                }),
                new Course({
                    name: 'Biology',
                    weight: 3,
                    courseGrades: [
                        new Grade({ grade: 3.5, weight: 2 }),
                        new Grade({ grade: 3.5, weight: 3 }),
                        new Grade({ grade: 2, weight: 3 })
                    ]
                }),
                new Course({
                    name: 'Chemistry',
                    weight: 3,
                    courseGrades: [
                        new Grade({ grade: 5, weight: 2 }),
                        new Grade({ grade: 5, weight: 1 })
                    ]
                })
            ]
        })
];
