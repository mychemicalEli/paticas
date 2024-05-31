// Importar los módulos y servicios necesarios de Angular y otros paquetes
import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './auth/auth-service/auth.service';

@Component({
  selector: 'app-root', // Selector del componente
  templateUrl: './app.component.html', // Ruta al archivo de la plantilla HTML
  styleUrls: ['./app.component.css'] // Ruta al archivo de estilos CSS
})
export class AppComponent {
  title = 'paticas'; // Título de la aplicación
  isLoginPage: boolean = false; // Variable para determinar si es la página de inicio de sesión

  // Constructor que inyecta el servicio de autenticación y el detector de cambios
  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) { }

  // Método que se llama cuando se inicializa el componente
  ngOnInit() {
    // Suscribirse al observable que indica si es la página de inicio de sesión
    this.authService.getIsLoginPage().subscribe(isLoginPage => {
      this.isLoginPage = isLoginPage; // Actualizar la variable isLoginPage
      this.cdr.detectChanges(); // Notificar a Angular de los cambios para actualizar la vista
    });
  }
}
