import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../models';
import {AverageService, UserService} from '../../services';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  @Input() student = new Student();
  constructor(private userService: UserService, private avgService: AverageService) { }

  ngOnInit() {
  }

}
