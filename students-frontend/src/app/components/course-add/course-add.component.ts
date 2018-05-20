import { Component, ViewChild, ElementRef } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Student, Course } from '../../models';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-course-add',
    templateUrl: './course-add.component.html'
})
export class CourseAddComponent {
    @ViewChild('content') content!: ElementRef;
    student = new Student();
    newCourse = new Course();

    constructor(private modalService: NgbModal) { }

    open(student: Student) {
        this.newCourse = new Course();
        this.student = student;
        this.modalService.open(this.content).result.then((result) => {
            this.parseClose(result);
        }, (reason) => {
            console.log(`Dismissed ${this.getDismissReason(reason)}`);
        });
    }

    save(): void {
    }

    cancel(): void {

    }

    private parseClose(reason: string) {
        if (reason === 'Save') {
            console.log('Saving');
            this.student.courses.push(this.newCourse);
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
