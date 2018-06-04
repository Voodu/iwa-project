import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    admin = '';

    constructor(private loginService: LoginService, private http: Http, private router: Router) {
    }

    ngOnInit() {
        if (!this.loginService.isLogged()) {
            this.router.navigateByUrl('/home');
        }
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Basic ' + btoa(this.loginService.getCredentials()));

        // tslint:disable-next-line:max-line-length
        this.http.get('http://localhost:8080/private/admin', { headers: headers }).subscribe((data: Response) => this.admin = data.text());
    }

}
