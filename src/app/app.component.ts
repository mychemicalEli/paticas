import { Component } from '@angular/core';
import { environment } from '../environments/environment.development';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'paticas';
  baseUrl=environment.baseApiUrl;

  isLoginPage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = (event.url === '/auth/login' || event.url === '/auth/signup'|| event.url === '');
      }
    });
  }
}
