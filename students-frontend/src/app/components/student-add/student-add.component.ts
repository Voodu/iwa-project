import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student, Course } from '../../models';
import { DataService } from '../../services';

@Component({
    selector: 'app-student-add',
    templateUrl: './student-add.component.html',
    styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
    @ViewChild('content') content!: ElementRef;
    students = new Array<Student>();
    newStudent = new Student();

    constructor(private modalService: NgbModal, private dataService: DataService) { }

    open(student: Student[]) {
        this.newStudent = new Student();
        this.students = student;
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
            this.students.push(this.newStudent);
            // this.dataService.addStudent(this.newStudent).subscribe(response =>
            //     this.students.push(this.newStudent));
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

    ngOnInit(): void {
    }

}
