import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Grade } from '../../models';

@Component({
    selector: 'app-grade',
    templateUrl: './grade.component.html',
    styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
    @Output() gradeRemove = new EventEmitter<any>();
    @Output() gradeChange = new EventEmitter<any>();

    @Input() grade = new Grade();

    constructor() {
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
