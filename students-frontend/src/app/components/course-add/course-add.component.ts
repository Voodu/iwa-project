import { Component, ViewChild, ElementRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student, Course, CourseInfo } from '../../models';
import { DataService } from '../../services';

@Component({
    selector: 'app-course-add',
    templateUrl: './course-add.component.html'
})
export class CourseAddComponent {
    @ViewChild('content') content!: ElementRef;
    student = new Student();
    selectedCourse!: CourseInfo | undefined;
    courses: CourseInfo[] = [];

    constructor(private modalService: NgbModal, private dataService: DataService) { }

    open(student: Student) {
        this.student = student;
        this.selectedCourse = undefined;
        this.dataService.getCourses().subscribe(data => {
            this.courses = data;
            this.filterExistingCourses();
        });
        this.modalService.open(this.content).result.then((result) => {
            this.parseClose(result);
        });
    }

    courseSelected(course: CourseInfo) {
        this.selectedCourse = course;
    }

    private save(): void {
        console.log('Saving');
        if (this.selectedCourse !== undefined) {
            this.student.courses.push(
                new Course({ courseInfo: this.selectedCourse, weight: this.selectedCourse.ECTS }));
            this.dataService.updateStudent(this.student).subscribe();
        }
    }

    private cancel(): void {
        console.log('Cancelling');
    }

    private parseClose(reason: string) {
        if (reason === 'Save') {
            this.save();
        }
        if (reason === 'Cancel') {
            this.cancel();
        }
    }

    private filterExistingCourses(): void {
        for (let i = this.student.courses.length - 1; i >= 0; i--) {
            for (let j = this.courses.length - 1; j >= 0; j--) {
                if (this.student.courses[i].courseInfo.id === this.courses[j].id) {
                    this.courses.splice(j, 1);
                }
            }
        }
    }
}
