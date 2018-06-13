import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {DataService, UserService} from '../../services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @ViewChild('content') content!: ElementRef;
    username = '';
    password = '';

    constructor(private modalService: NgbModal, private userService: UserService, private dataService: DataService) { }

    open(): boolean {
        this.username = this.password = '';
        this.modalService.open(this.content).result.then((result: any) => {
            this.parseClose(result);
        }, (reason: any) => {
            console.log(`Dismissed`);
        });
        return false;
    }

    login(): void {
        this.userService.login(this.username, this.password).subscribe(
          result => this.dataService.setToken(result.token),
            error => console.log('Error')
        );
    }

    private parseClose(reason: string) {
        if (reason === 'Login') {
            console.log('Logging in');
            this.login();
        }
        if (reason === 'Cancel') {
            console.log('Cancelling');
        }
    }

    ngOnInit(): void {
    }
}
