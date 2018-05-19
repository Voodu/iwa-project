import { Component, OnInit } from '@angular/core';
import { Student, Course, Grade } from '../../models';
import { DataService } from '../../services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    title = 'Students App';
    students = new Array<Student>();

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.dataService.getStudents().subscribe(data => this.students = data, error => this.students = this.dataService.getMockStudents());
    }

    update(student: Student) {
        this.dataService.updateStudent(student).subscribe(data => console.log(`Updated student id...`));
    }
}
