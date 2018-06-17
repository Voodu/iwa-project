import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {DataService, UserService} from '../../services';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Token} from '../../models/Token.model';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';

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

    constructor(private modalService: NgbModal, private userService: UserService, private dataService: DataService, private router: Router) { }

    open(): boolean {
        this.username = this.password = '';
        this.modalService.open(this.content).result.then((result: any) => {
            console.log('Fullfilled');
            this.parseClose(result);
        }, (reason: any) => {
            console.log(`Dismissed`);
        });
        return false;
    }

    login(): void {
        this.userService.login(this.username, this.password).subscribe(result =>{
            this.errormessage = '';
            this.dataService.setToken(result.token);
            close(); //TODO close modal
            this.router.navigateByUrl('/home')
        }, this.onError);
    }

    private parseClose(reason: string) {
        if (reason === 'Login') {
            this.login();
        }
    }

    ngOnInit(): void {
    }

    private onSuccess(result: Token) { //TODO place this method in subscribe above
        this.errormessage = '';
        this.dataService.setToken(result.token);
    }

    private onError(error: HttpErrorResponse) {
        switch (error.status) {
            case 401: this.errormessage = 'Wrong password'; break;
            case 404: this.errormessage = 'No such user'; break;
            case 418: this.errormessage = 'Login and password cannot be empty'; break;
        }
        console.log(`Login failed. Reason: ${this.errormessage}`);
    }
}
