import { Component, OnInit } from '@angular/core';
import { Student } from '../../models';
import { DataService } from '../../services';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
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
