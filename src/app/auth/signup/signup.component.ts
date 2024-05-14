import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
 
  showUserFields: boolean = false;
  showShelterFields: boolean = false;


  role: string = ''; 
  name: string = '';
  lastName: string = '';
  cif: string = '';
  location: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordError: boolean = false;

  constructor(public userService: UserService, public router: Router) {}

  register() {
    const user = { email: this.email, password: this.password };
    this.userService.register(user).subscribe(data => {
      this.userService.setToken(data.token);
      this.router.navigateByUrl("/home");
    },
    error => {
      console.log(error);
    });
  }

  

  onUserTypeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.role = value;
    this.showUserFields = value === 'user';
    this.showShelterFields = value === 'shelterAdmin';
  }
}
