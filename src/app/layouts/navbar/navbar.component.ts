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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.getUserRole(); // Obtener el rol al inicio

    // Suscribirse a los cambios en el rol
    this.userRoleSubscription = this.userService.getRoleSubject().subscribe(role => {
      this.userRole = role;
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
