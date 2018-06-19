import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services';
import {Access} from '../../enums';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    constructor(protected userService: UserService) {
    }

    getUserName() {
        switch (this.userService.getRole()) {
            case Access.Admin: return 'Administrator';
            case Access.Professor: return 'Professor';
            case Access.Student: return 'Student';
            default: return 'Guest';
        }
    }



    ngOnInit() {
    }

}
