import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseInfo } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../../services';

@Component({
    selector: 'app-courseinfo-add',
    templateUrl: './courseinfo-add.component.html',
    styleUrls: ['./courseinfo-add.component.css']
})
export class CourseinfoAddComponent implements OnInit {

    newCourse = new CourseInfo();
    errorMessage = '';

    constructor(private activeModal: NgbActiveModal, private dataService: DataService) { }

    ngOnInit() {
        this.newCourse.ECTS = 3;
        this.newCourse.name = '';
    }

    add(): void {
        this.dataService.addCourseInfo(this.newCourse)
        .subscribe(this.onSuccess.bind(this), this.onError.bind(this));
    }

    close(): void {
        this.activeModal.close();
    }

    private onSuccess(result: any) {
        this.activeModal.close();
    }

    private onError(error: HttpErrorResponse) {
        switch (error.status) {
            case 404: this.errorMessage = 'Resource not found'; break;
        }
        console.log(`Adding failed: ${this.errorMessage}`);
    }

}
