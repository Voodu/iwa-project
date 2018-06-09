import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from '../models';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
      this.user.role = 'ADMIN';
    }

    user = new AppUser();
    logged = false;

    login(username: string, password: string) {
        /*const user = new AppUser();
        user.username = username;
        user.password = password;
        this.http.post<AppUser>('http://localhost:8080/public/login', user)
            .subscribe(
                result => {
                    this.user = result;
                    if (this.user) {
                        this.logged = true;
                    }
                }
            );*/
        this.logged = true;
    }
    getRole(): string {
      return this.user.role;
    }

    isLogged() {
        return this.logged;
    }

}
