import { Component } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!: string;
  password!: string;
  constructor(public userService: UserService, public router: Router) {}

  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user)
    .pipe()
    .subscribe(data => {
      this.userService.setToken(data.token);
      this.router.navigateByUrl("/home");
    },
    error => {
      console.log(error);
    });
  }
}
