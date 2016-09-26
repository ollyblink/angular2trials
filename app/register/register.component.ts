import {Component, Input} from "@angular/core";
import {User} from "../models/user";
import {RegisterService} from "./register.service";
import {Router} from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: 'app/register/register.component.html',
  styleUrls: ['app/register/register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent {


  private message: string;
  private userModel = new User("", "");


  constructor(private router: Router, private registerService: RegisterService) {
  }


  register(): void {
    this.message = "Waiting for response";
    this.registerService.register(this.userModel.username, this.userModel.password).then(message => {
      this.message = message;
      let link = ['/login'];
      this.router.navigate(link);
    });
  }

}
