import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppUser} from '../models';
import {Token} from '../models/Token.model';

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
    this.http.post<Token>(loginUrl, user)
      .subscribe(
        result => {
          UserService.tokenInfo = result;
          if (result) {
            UserService.logged = true;
          }
        }
      );

  }

  getRole(): string {
    return UserService.getUserAccess().name; // TODO delete this and use getUserName above token has both username and role information
  }

  isLogged() {
    return UserService.logged;
  }

}
