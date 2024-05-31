import { Component } from '@angular/core';
import { UserService } from '../../auth/user-service/user.service'; // Importa el servicio de usuario
import { Subscription } from 'rxjs'; // Importa Subscription de RxJS para la gestión de suscripciones

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'] // Establece la hoja de estilos para el componente
})
export class FooterComponent {
  userRole: string = ''; // Variable para almacenar el rol del usuario
  isLoggedIn: boolean = false; // Variable para indicar si el usuario está conectado
  private userRoleSubscription: Subscription | undefined; // Suscripción a los cambios en el rol del usuario

  constructor(public userService: UserService) { } // Inyecta el servicio de usuario en el constructor

  ngOnInit(): void {
    // Suscribirse al estado de inicio de sesión
    this.userService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn; // Actualiza el estado de inicio de sesión
      this.getUserRole(); // Obtiene el rol del usuario
    });

    // Suscribirse a los cambios en el rol del usuario
    this.userRoleSubscription = this.userService.getRoleSubject().subscribe(role => {
      this.userRole = role; // Actualiza el rol del usuario
    });

    // Obtener el rol inicial del usuario
    this.getUserRole();
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    if (this.userRoleSubscription) {
      this.userRoleSubscription.unsubscribe();
    }
  }

  // Método privado para obtener el rol del usuario
  private getUserRole() {
    this.userRole = this.userService.getRole();
  }
}
