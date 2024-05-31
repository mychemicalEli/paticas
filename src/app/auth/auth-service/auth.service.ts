import { Injectable } from '@angular/core'; // Importa el decorador Injectable desde el paquete @angular/core
import { BehaviorSubject } from 'rxjs'; // Importa la clase BehaviorSubject desde el paquete rxjs

@Injectable({ // Marca la clase como un servicio inyectable
  providedIn: 'root' // Indica que este servicio estará disponible para toda la aplicación
})
export class AuthService { // Define la clase AuthService
  private isLoginPageSubject = new BehaviorSubject<boolean>(false); // Crea una instancia de BehaviorSubject con un valor inicial de false

  constructor() { } // Constructor vacío

  // Método para actualizar el estado de la página de inicio de sesión
  setIsLoginPage(isLoginPage: boolean) {
    this.isLoginPageSubject.next(isLoginPage); // Actualiza el valor del BehaviorSubject con el valor proporcionado
  }

  // Método para obtener el estado actual de la página de inicio de sesión
  getIsLoginPage() {
    return this.isLoginPageSubject.asObservable(); // Retorna un observable del BehaviorSubject para que los componentes puedan suscribirse y recibir actualizaciones
  }
}
