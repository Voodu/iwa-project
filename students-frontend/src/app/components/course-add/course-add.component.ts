import { Component, ViewChild, ElementRef } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Student, Course, CourseInfo } from '../../models';
import { NgModel } from '@angular/forms';
import { DataService } from '../../services';

@Component({
    selector: 'app-course-add',
    templateUrl: './course-add.component.html'
})
export class CourseAddComponent {
    @ViewChild('content') content!: ElementRef;
    student = new Student();
    selectedCourse = new CourseInfo();
    courses: CourseInfo[] = [];

    constructor(private modalService: NgbModal, private dataService: DataService) { }

    open(student: Student) {
        this.selectedCourse = new CourseInfo();
        this.student = student;
        this.dataService.getCourses().subscribe(data => this.courses = data); // TODO: Remove existing student courses from add-list
        this.modalService.open(this.content).result.then((result) => {
            this.parseClose(result);
        }, (reason) => {
            console.log(`Dismissed ${this.getDismissReason(reason)}`);
        });
    }

    courseSelected(course: CourseInfo) {
        this.selectedCourse = course;
        console.log(this.selectedCourse);
    }

    save(): void {
    }

    cancel(): void {

    }

    private parseClose(reason: string) {
        if (reason === 'Save') {
            console.log('Saving');
            const course = new Course();
            course.courseInfo = this.selectedCourse;
            course.weight = course.courseInfo.ECTS;
            this.student.courses.push(course);
            this.dataService.updateStudent(this.student).subscribe(data => console.log(data));
        }
        if (reason === 'Cancel') {
            console.log('Cancelling');
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
