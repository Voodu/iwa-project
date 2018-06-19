import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppUser, Student} from '../models';
import {Token} from '../models/Token.model';
import {DataService} from './data.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {reject} from 'q';
import {Access} from '../enums';

const loginUrl = 'http://localhost:8080/public/login';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient, private router: Router) {
    }

    tokenInfo = new Token();
    logged = false;

    login(username: string, password: string) {
        const user = new AppUser();
        user.username = username;
        user.password = password;
        return this.http.post<Token>(loginUrl, user).pipe(
            tap(result => {
                this.log('Got real token!');
                this.tokenInfo = result;
                if (result && result.accessLevel < 3) {
                    this.logged = true;
                    this.log(result.token);
                }
            }),
            catchError(this.handleError<Token>(`login (username = ${username}, password = ${password})`))
        )

    }

    getRole(): Access {
        return this.tokenInfo.accessLevel as Access;
    }

    isLogged() {
        return this.logged;
    }

    private log(message: string) {
        console.log('StudentService: ' + message);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);
            this.log(`${operation} failed: ${error.message}`);
            return throwError(error);
        };
    }
}
