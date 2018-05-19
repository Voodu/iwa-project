import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GradeComponent } from '../grade/grade.component';
import { Course, Grade } from '../../models';
import { AverageService } from '../../services';

@Component({
    selector: 'app-grades-view',
    templateUrl: './grades-view.component.html',
    styleUrls: ['./grades-view.component.css']
})
export class GradesViewComponent implements OnInit {
    @Output() gradeChange = new EventEmitter<any>();
    @Input() course = new Course();

    constructor(private avgService: AverageService) {
    }

    addGrade(): void {
        this.course.courseGrades.push(new Grade({ grade: 2, weight: 0 }));
    }

    remove(grade: Grade): void {
        this.course.courseGrades.splice(this.course.courseGrades.indexOf(grade), 1);
        this.gradeChange.emit(null);
    }

    onGradeChange() {
        this.gradeChange.emit(null);
    }

    ngOnInit() {
    }
}
