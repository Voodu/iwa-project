import { Component, ViewChild, ElementRef } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Student, Course } from '../../models';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-course-add',
    templateUrl: './course-add.component.html'
})
export class CourseAddComponent {
    // TODO: Change whole component to use ng-bootstrap modal after it is updated to Angular 6
    @ViewChild('activator') activator: ElementRef<HTMLButtonElement> | undefined;
    student: Student = new Student();
    newCourse: Course = new Course();

    open(student: Student) {
        this.newCourse = new Course();
        this.student = student;
        if (this.activator != null) {
            this.activator.nativeElement.click();
        }
    }

    save(): boolean {
        console.log('save');
        return true;
    }

    cancel(): boolean {
        console.log('cancel');
        return false;

    }
}
