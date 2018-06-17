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
    searchedStudents: Student[] = [];
    temporaryStudents: Student[] = [];
    access = Access;
    view: boolean;

    constructor(private dataService: DataService, protected userService: UserService) {
      this.view = false;
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
  sortStudents(): void {
    this.students.sort(function (a, b) {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
  }
  searching(input: HTMLInputElement): void {
      if (input.value !== '') {
        let i;
        const text = input.value.toString().toLowerCase();
        for (i = 0; i < this.students.length; i++) {
          if (this.students[i].name.toLowerCase().search(text) >= 0 || this.students[i].surname.toLowerCase().search(text) >= 0) {
            this.searchedStudents.push(this.students[i]);
            console.log(this.students[i]);
          }
        }
        input.value = '';
        this.view = !this.view;
        this.temporaryStudents = this.students.slice();
        this.students = this.searchedStudents.slice();
      }
  }
  viewAll(): void {
      this.view = !this.view;
      this.students = this.temporaryStudents.slice();
      this.searchedStudents = [];
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
