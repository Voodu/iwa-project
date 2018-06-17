import { Component, OnInit } from '@angular/core';
import { Student } from '../../models';
import { DataService, UserService } from '../../services';
import { Access } from '../../enums';

@Component({
    selector: 'app-students-list',
    templateUrl: './students-list.component.html',
    styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
    students: Student[] = [];
    access = Access;

    constructor(private dataService: DataService, protected userService: UserService) {
    }

    ngOnInit(): void {
        this.getStudents();
    }

    getStudents(): void {
        if (this.userService.getRole() === Access.Student) {
            this.dataService.getMe().subscribe(data => this.students[0] = data, error => console.log('Error'));
        } else {
            // tslint:disable-next-line:max-line-length
            this.dataService.getStudents().subscribe(
                data => this.students = this.dataService.fixModels(data),
                error => this.students = this.dataService.getMockStudents());
        }
    }

    test() {
        console.log(this.userService.getRole());
        console.log(this.students);
    }

    update(student: Student) {
        this.dataService.updateStudent(student).subscribe(data => console.log(`Updated student id...`));
    }
    deleteStudent(key: number): boolean {
        this.dataService.deleteStudent(this.students[key]).subscribe(data => console.log(`Delete student id...`));
        const index = this.students.indexOf(this.students[key], 0);
        if (index > -1) {
            this.students.splice(index, 1);
        }
        return false;
    }

}
