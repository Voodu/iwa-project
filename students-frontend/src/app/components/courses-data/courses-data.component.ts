import { Component, OnInit, Input } from '@angular/core';
import { Student, Course } from '../../models';
import { AverageService, DataService } from '../../services';

@Component({
    selector: 'app-courses-data',
    templateUrl: './courses-data.component.html',
    styleUrls: ['./courses-data.component.css']
})
export class CoursesDataComponent implements OnInit {
    @Input() student = new Student();
    selectedCourse = new Course();

    constructor(private avgService: AverageService, private dataService: DataService) {
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

    update(student: Student) {
        this.dataService.updateStudent(student).subscribe(data => console.log(`Updated student id...`));
    }

    ngOnInit() {
        this.selectedCourse = this.student.courses[0] || new Course();
        this.updateAvg();
    }
}
