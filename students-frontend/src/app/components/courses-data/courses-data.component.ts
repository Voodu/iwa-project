import { Component, OnInit, Input } from '@angular/core';
import { Student, Course } from '../../models';
import { AverageService } from '../../services';

@Component({
    selector: 'app-courses-data',
    templateUrl: './courses-data.component.html',
    styleUrls: ['./courses-data.component.css']
})
export class CoursesDataComponent implements OnInit {
    @Input() student = new Student();
    selectedCourse = new Course();

    constructor(private avgService: AverageService) {
    }

    courseSelected(course: Course): void {
        this.selectedCourse = course;
        this.updateAvg();
    }

    updateAvg(): void {
        if (this.selectedCourse.courseGrades != null) {
            this.selectedCourse.grade = this.avgService.getAverage(this.selectedCourse.courseGrades);
        }
    }

    ngOnInit() {
        this.selectedCourse = this.student.courses[0] || new Course();
        this.updateAvg();
    }
}
