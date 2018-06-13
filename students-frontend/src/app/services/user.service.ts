import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppUser} from '../models';
import {Token} from '../models/Token.model';
import {DataService} from './data.service';

const loginUrl = 'http://localhost:8080/public/login';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private dataServie: DataService) {
  }

  static ACCESS = {
    ADMIN: {accessLevel: 0, name: 'administrator'},
    PROF: {accessLevel: 1, name: 'professor'},
    STUDENT: {accessLevel: 2, name: 'student'},
    GUEST: {accessLevel: 3, name: 'guest'}
  };

  tokenInfo = new Token();
  logged = false;


  getUserAccess() {
    switch (this.tokenInfo.accessLevel) {
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
          this.tokenInfo = result;
          if (result && result.accessLevel < 3) {
            this.logged = true;
            this.dataServie.setToken(result.token);
            this.log(result.token);
          }
        }
      );

  }

  getRole(): string {
    return this.getUserAccess().name; // TODO delete this and use getUserName above token has both username and role information
  }

  isLogged() {
    return this.logged;
  }
  private log(message: string) {
    console.log('StudentService: ' + message);
  }
}
