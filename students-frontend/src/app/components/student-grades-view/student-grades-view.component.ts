import {Component, Input, OnInit} from '@angular/core';
import {Course, Student} from '../../models';
import {AverageService, DataService} from '../../services';

@Component({
  selector: 'app-student-grades-view',
  templateUrl: './student-grades-view.component.html',
  styleUrls: ['./student-grades-view.component.css']
})
export class StudentGradesViewComponent implements OnInit {
  @Input() student = new Student();
  selectedCourse = new Course();
  constructor(private avgService: AverageService) { }
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
  }

}
