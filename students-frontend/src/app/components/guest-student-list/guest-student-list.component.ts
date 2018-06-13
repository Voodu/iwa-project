import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services';
import {Student} from '../../models';

@Component({
  selector: 'app-guest-student-list',
  templateUrl: './guest-student-list.component.html',
  styleUrls: ['./guest-student-list.component.css']
})
export class GuestStudentListComponent implements OnInit {
  @Input() student = new Student();
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
