import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Student, Course } from '../../models';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-course-add',
    templateUrl: './course-add.component.html'
})
export class CourseAddComponent implements OnInit {
    // TODO: Change whole component to use ng-bootstrap modal after it is updated to Angular 6
    static counter = 0;
    @ViewChild('activator')
    activator!: ElementRef<HTMLButtonElement>;
    @ViewChild('modal')
    modal!: ElementRef<HTMLDivElement>;

    student: Student = new Student();
    newCourse: Course = new Course();

    ngOnInit(): void {
        this.modal.nativeElement.id = 'modal' + CourseAddComponent.counter;
        this.activator.nativeElement.setAttribute('data-target', '#modal' + CourseAddComponent.counter++);
    }

    open(student: Student) {
        this.newCourse = new Course();
        this.student = student;
        this.activate();
    }

    save(): boolean {
        console.log('save');
        this.student.courses.push(this.newCourse);
        return false;
    }

    cancel(): boolean {
        console.log('cancel');
        return false;
    }

    private activate(): void {
        if (this.activator != null) {
            this.activator.nativeElement.click();
        }
    }
}
