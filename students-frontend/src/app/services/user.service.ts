import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppUser} from '../models';
import {Token} from '../models/Token.model';

@Injectable({
  providedIn: 'root'
})

const loginUrl = 'http://localhost:8080/public/login';

export class UserService {

  constructor(private http: HttpClient) {
  }

  tokenInfo = new Token();
  logged = false;

  static getUserName(accessLevel: number) {
    switch (accessLevel) {
      case 0:
        return 'administrator';
      case 1:
        return 'professor';
      case 2:
        return 'student';
      default:
        return 'guest';
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
          if (this.tokenInfo) {
            this.logged = true;
          }
        }
      );

  }

  isLogged() {
    return this.logged;
  }

}
