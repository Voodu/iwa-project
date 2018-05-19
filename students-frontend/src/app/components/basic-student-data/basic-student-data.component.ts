import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../models';
import { AverageService } from '../../services';

@Component({
    selector: 'app-basic-student-data',
    templateUrl: './basic-student-data.component.html',
    styleUrls: ['./basic-student-data.component.css']
})
export class BasicStudentDataComponent implements OnInit {

    @Input() student = new Student();

    constructor(private avgService: AverageService) {
    }

    ngOnInit() {
    }
}
