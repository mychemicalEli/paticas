import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.css',
})
export class NavbarUserComponent {
  constructor(private cookies: CookieService, private router: Router){}
logOut(){
  this.cookies.delete("token");
  this.router.navigate(['/auth/login']);
}
}
