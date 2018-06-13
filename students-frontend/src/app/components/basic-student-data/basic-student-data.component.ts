import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Student } from '../../models';
import {AverageService} from '../../services';

@Component({
    selector: 'app-basic-student-data',
    templateUrl: './basic-student-data.component.html',
    styleUrls: ['./basic-student-data.component.css']
})
export class BasicStudentDataComponent implements OnInit {

    @Input() student = new Student();
    @Output() deleteEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor(private avgService: AverageService) {
    }
    deleteST(): void {
      this.deleteEvent.emit(null);
      console.log('Emitted deleteEvent');
    }

    ngOnInit() {
    }
}
