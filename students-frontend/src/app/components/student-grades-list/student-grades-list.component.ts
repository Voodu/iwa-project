import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AverageService} from '../../services';
import {Course, Grade} from '../../models';

@Component({
  selector: 'app-student-grades-list',
  templateUrl: './student-grades-list.component.html',
  styleUrls: ['./student-grades-list.component.css']
})
export class StudentGradesListComponent implements OnInit {
  @Input() course = new Course();

  constructor(private avgService: AverageService) {
  }
  ngOnInit() {
  }

}
