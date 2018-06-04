import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    username = '';
    password = '';
    logged = false;

    login(username: string, password: string) {
        this.http.post<Boolean>('http://localhost:8080/public/login', { username: username, password: password })
            .subscribe(
                result => {
                    this.logged = result.valueOf();
                    if (this.logged) {
                        this.username = username;
                        this.password = password;
                    }
                }
            );

    }

    getCredentials(separator = ':'): string {
        return `${this.username}${separator}${this.password}`;
    }

    isLogged() {
        return this.logged;
    }

}
