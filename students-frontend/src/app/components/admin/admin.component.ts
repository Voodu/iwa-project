import { Component, OnInit } from '@angular/core';
import { UserService, DataService } from '../../services';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseinfoAddComponent } from '../courseinfo-add/courseinfo-add.component';
import { CourseInfo } from '../../models';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    courses!: CourseInfo[];

    constructor(private userService: UserService, private modalService: NgbModal, private dataService: DataService) {
    }

    ngOnInit() {
        this.dataService.getCourses().subscribe(data => this.courses = data);
    }

    openModal(): boolean {
        this.modalService.open(CourseinfoAddComponent);
        return false;
    }

    // deleteCourse(ix: number)
    // {
        
    // }

}
