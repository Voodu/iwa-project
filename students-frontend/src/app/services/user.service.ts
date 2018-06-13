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

  tokenInfo = new Token();
  logged = false;

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

  getRole(): number {
    return this.tokenInfo.accessLevel; // TODO delete this and use getUserName above token has both username and role information
  }

  isLogged() {
    return this.logged;
  }
  private log(message: string) {
    console.log('StudentService: ' + message);
  }
}
