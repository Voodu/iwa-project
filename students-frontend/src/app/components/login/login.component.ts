import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService, UserService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';
import { Token } from '../../models';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username = '';
    password = '';
    errorMessage = '';

    constructor(
        private activeModal: NgbActiveModal,
        private userService: UserService,
        private dataService: DataService,
        private router: Router) { }

    login(): void {
        this.router.navigateByUrl('/about');
        this.userService.login(this.username, this.password).subscribe(this.onSuccess.bind(this), this.onError.bind(this));
    }

    close(): void {
        this.activeModal.close();
    }

    ngOnInit(): void {
    }

    private onSuccess(result: Token) {
        this.errorMessage = '';
        this.dataService.setToken(result.token);
        this.activeModal.close();
        this.router.onSameUrlNavigation = 'reload'; // Does not work :(
        this.router.navigateByUrl('/home');
    }

    private onError(error: HttpErrorResponse) {
        switch (error.status) {
            case 401: // Do not provide info which is wrong - prevent username enumeration
            case 404: this.errorMessage = 'Wrong username or password'; break;
            case 418: this.errorMessage = 'Login and password cannot be empty'; break;
        }
        console.log(`Login failed. Reason: ${this.errorMessage}`);
    }
}
