import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {DataService, UserService} from '../../services';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @ViewChild('content') content!: ElementRef;
    username = '';
    password = '';
    errormessage = '';

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
          result => {
              this.errormessage = '';
              this.dataService.setToken(result.token);
          },
            (error: HttpErrorResponse) => {
              console.log('Error');
              this.displayError(error);
            }
        );
    }

    private parseClose(reason: string) {
        if (reason === 'Login') {
            this.login();
        }
    }

    ngOnInit(): void {
    }


    private displayError(error: HttpErrorResponse) {
        switch (error.status) {
            case 401: this.errormessage = 'Wrong password'; break;
            case 404: this.errormessage = 'No such user'; break;
            case 418: this.errormessage = 'Login and password cannot be null'; break;
        }
    }
}
