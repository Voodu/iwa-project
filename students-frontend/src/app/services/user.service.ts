import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppUser, Student} from '../models';
import {Token} from '../models/Token.model';
import {DataService} from './data.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

const loginUrl = 'http://localhost:8080/public/login';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {
  }

  static ACCESS = {
    ADMIN: {accessLevel: 0, name: 'administrator'},
    PROF: {accessLevel: 1, name: 'professor'},
    STUDENT: {accessLevel: 2, name: 'student'},
    GUEST: {accessLevel: 3, name: 'guest'}
  };

  static tokenInfo = new Token();
  static logged = false;


  static getUserAccess() {
    switch (UserService.tokenInfo.accessLevel) {
      case 0:
        return UserService.ACCESS.ADMIN;
      case 1:
        return UserService.ACCESS.PROF;
      case 2:
        return UserService.ACCESS.STUDENT;
      default:
        return UserService.ACCESS.GUEST;
    }
  }

  login(username: string, password: string) {
    const user = new AppUser();
    user.username = username;
    user.password = password;
    return this.http.post<Token>(loginUrl, user).pipe(
      tap(result => {
            UserService.tokenInfo = result;
            if (result && result.accessLevel < 3) {
              UserService.logged = true;
              this.log(result.token);
            }
      }),
      catchError(this.handleError<Token>(`login username = ${username}, password = ${password}`))
    );

  }

  getRole(): string {
    return UserService.getUserAccess().name; // TODO delete this and use getUserName above token has both username and role information
  }

  isLogged() {
    return UserService.logged;
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
