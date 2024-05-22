import { Component } from '@angular/core';
import { UserService } from '../../auth/user-service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})


export class FooterComponent {
  userRole: string = '';
  isLoggedIn: boolean = false;
  private userRoleSubscription: Subscription | undefined;
  constructor(public userService: UserService) { }
  ngOnInit(): void {
    this.userService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
  });
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    if (this.userRoleSubscription) {
      this.userRoleSubscription.unsubscribe();
    }
  }

  private getUserRole() {
    this.userRole = this.userService.getRole();
  }
}
