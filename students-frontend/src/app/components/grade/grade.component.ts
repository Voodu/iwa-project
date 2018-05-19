import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Grade } from '../../models';

@Component({
    selector: 'app-grade',
    templateUrl: './grade.component.html',
    styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
    @Output() gradeRemove: EventEmitter<any> = new EventEmitter<any>();
    @Output() gradeChange: EventEmitter<any> = new EventEmitter<any>();

    @Input() grade: Grade;

    constructor() {
        this.grade = new Grade({ grade: 5, weight: 0 });
    }

    remove(): void {
        this.gradeRemove.emit(null);
    }

    onChange(): void {
        this.gradeChange.emit(null);
    }

    ngOnInit() {
    }
}
