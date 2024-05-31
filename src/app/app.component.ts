import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './auth/auth-service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'paticas';
  isLoginPage: boolean = false;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.authService.getIsLoginPage().subscribe(isLoginPage => {
      this.isLoginPage = isLoginPage;
      this.cdr.detectChanges(); // Notificar a Angular de los cambios
    });
  }
}
