import { Component } from '@angular/core';
import { UserService } from '../../auth/user-service/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})


export class FooterComponent {
  userRole: string = '';
  isLoggedIn: boolean = false;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
      // Obtener el rol del usuario del servicio
      this.userRole = this.userService.getRole();
      // Verificar si el usuario está autenticado
      this.isLoggedIn = this.userService.isLoggedIn();
  }
}
