import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar-shelter',
  templateUrl: './navbar-shelter.component.html',
  styleUrl: './navbar-shelter.component.css',
})
export class NavbarShelterComponent {
  constructor(private cookies: CookieService, private router: Router){}
  logOut(){
    this.cookies.delete("token");
    this.router.navigate(['/auth/login']);
  }
}
