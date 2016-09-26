import {Component, Input} from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from '@angular/router';
import {User} from "../models/user";

@Component({
  selector: 'login',
  templateUrl: 'app/login/login.component.html',
  styleUrls: ['app/login/login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {
  private message: string;
  private json: any;
  private isLoggedIn: string;
  private userModel = new User("", "");

  public constructor(private router: Router, private loginService: LoginService) {
  }

  public login(): void {
    this.message = "waiting for response";
    this.loginService.login(this.userModel.username, this.userModel.password)
      .then(res => {
        if (res.status != 200) {
          this.message = "Could not find user with username " + this.userModel.username;
        } else {
          this.message = res.json().message;
        }
        localStorage.setItem('user', res.json().user);

        this.isLoggedIn = localStorage.getItem('user');
        let link = ['/data'];
        this.router.navigate(link);
      });
  }

}
