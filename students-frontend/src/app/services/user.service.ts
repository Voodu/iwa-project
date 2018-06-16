import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser, Student } from '../models';
import { Token } from '../models/Token.model';
import { DataService } from './data.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

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
                this.tokenInfo = result;
                if (result && result.accessLevel < 3) {
                    this.logged = true;
                    this.log(result.token);
                    this.router.navigateByUrl('/about');
                }
            }),
            catchError(this.handleError<Token>(`login username = ${username}, password = ${password}`))
        );

    }

    getRole(): number {
        return this.tokenInfo.accessLevel; // TODO delete this and use getUserName above token has both username and role information
    }

    isLogged() {
        return this.logged;
    }
    private log(message: string) {
        console.log('StudentService: ' + message);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
