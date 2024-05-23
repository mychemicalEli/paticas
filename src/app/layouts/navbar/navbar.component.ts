import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../auth/user-service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userRole!: string; 
  isLoggedIn: boolean = false;
  private userRoleSubscription: Subscription | undefined;

  constructor(public userService: UserService) { } // Cambiar a 'public'

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
