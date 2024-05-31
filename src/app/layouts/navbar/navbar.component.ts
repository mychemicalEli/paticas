import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../auth/user-service/user.service'; // Importa el servicio de usuario
import { Subscription } from 'rxjs'; // Importa la clase Subscription de RxJS

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html', // Plantilla HTML del componente
  styleUrls: ['./navbar.component.css'] // Estilos CSS del componente
})
export class NavbarComponent implements OnInit, OnDestroy {
  userRole!: string; // Variable para almacenar el rol del usuario
  isLoggedIn: boolean = false; // Variable para verificar si el usuario está conectado
  private userRoleSubscription: Subscription | undefined; // Suscripción al cambio de rol del usuario

  constructor(public userService: UserService) { } // Inyecta el servicio de usuario en el constructor

  ngOnInit(): void {
    // Suscribirse al estado de inicio de sesión del usuario
    this.userService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn; // Actualiza el estado de inicio de sesión
      this.getUserRole(); // Obtiene el rol del usuario
    });

    // Suscribirse a los cambios en el rol del usuario
    this.userRoleSubscription = this.userService.getRoleSubject().subscribe(role => {
      this.userRole = role; // Actualiza el rol del usuario
    });

    this.getUserRole(); // Obtiene el rol del usuario al inicializar el componente
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    if (this.userRoleSubscription) {
      this.userRoleSubscription.unsubscribe();
    }
  }

  // Método para obtener el rol del usuario
  private getUserRole() {
    this.userRole = this.userService.getRole(); // Obtiene el rol del usuario del servicio
  }
}
