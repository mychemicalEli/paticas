import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { sha256 } from 'js-sha256';

@Injectable({
    providedIn: "root", // Indica que este servicio estará disponible en toda la aplicación
})
export class UserService {
    baseUrl = environment.baseApiUrl; // URL base de la API obtenida del entorno
    private role: string = ''; // Variable para almacenar el rol del usuario
    private userEmail: string = ''; // Variable para almacenar el correo electrónico del usuario
    private isLoggedInSubject = new BehaviorSubject<boolean>(false); // BehaviorSubject para rastrear el estado de inicio de sesión
    private readonly roleSubject = new Subject<string>(); // Subject para emitir cambios en el rol del usuario

    // Constructor del servicio, inyecta HttpClient y CookieService
    constructor(private httpClient: HttpClient, private cookies: CookieService) {

        // Recuperar el rol del localStorage al inicializar el servicio
        const savedRole = localStorage.getItem('userRole');
        if (savedRole) {
            this.role = savedRole;
            this.roleSubject.next(this.role); // Emitir el rol recuperado
        }
    }


    // Método para iniciar sesión de usuario
    login(user: any): Observable<any> {
        console.log('Datos enviados al backend:', user); // Imprime los datos de usuario enviados al backend
        return this.httpClient.post(`${this.baseUrl}auth/login`, user); // Hace una solicitud HTTP POST al endpoint de inicio de sesión
    }

    // Método para registrar un nuevo usuario
    register(user: any): Observable<any> { 
        // Encripta la contraseña antes de enviarla al servidor
        const encryptedPassword = sha256(user.password);

        // Crea una copia del usuario con la contraseña encriptada
        const userWithEncryptedPassword = { ...user, password: encryptedPassword };

        // Hace una solicitud HTTP POST al endpoint de registro
        return this.httpClient.post(`${this.baseUrl}auth/signup`, userWithEncryptedPassword);
    }

    // Método para establecer el token de autenticación en las cookies
    setToken(token: string) {
        this.cookies.set("token", token);
    }

    // Método para obtener el token de autenticación desde las cookies
    getToken() {
        return this.cookies.get("token");
    }

    // Método para establecer el rol del usuario
    setRole(role: string) {
        this.role = role; // Establece el rol en la propiedad del servicio
        localStorage.setItem('userRole', role); // Guarda el rol en el localStorage
        this.roleSubject.next(role); // Emite el cambio de rol
    }

    // Método para obtener el rol del usuario
    getRole(): string {
        return this.role; // Retorna el rol almacenado en la propiedad del servicio
    }

     // Método para establecer el correo electrónico del usuario
    setUserEmail(email: string) {
        this.userEmail = email; // Establece el correo electrónico en la propiedad del servicio
    }

     // Método para obtener el correo electrónico del usuario
    getUserEmail(): string {
        return this.userEmail; // Retorna el correo electrónico almacenado en la propiedad del servicio
    }

    // Método para obtener el rol del usuario basado en su correo electrónico
    getUserRole(email?: string): string {
        if (email) {
            this.setUserEmail(email); // Establece el correo electrónico si se proporciona
        }
        const userEmail = this.getUserEmail(); // Obtiene el correo electrónico del usuario
        if (userEmail === "user@example.com") {
            return "user"; // Retorna "user" si el correo electrónico es "user@example.com"
        } else if (userEmail === "admin@example.com") {
            return "shelter"; // Retorna "shelter" si el correo electrónico es "admin@example.com"
        } else {
            return ""; // Retorna vacío si no se encuentra el rol
        }
    }


    // Método para verificar si el usuario está autenticado
    isLoggedIn(): Observable<boolean> {
        const token = this.getToken(); // Obtiene el token de autenticación desde las cookies
        const isLoggedIn = !!token; // Comprueba si hay un token (usuario autenticado)

        // Actualiza el estado de inicio de sesión en el BehaviorSubject
        this.isLoggedInSubject.next(true);

        return this.isLoggedInSubject.asObservable(); // Retorna el BehaviorSubject como un Observable
    }

     // Método para obtener el Subject que emite cambios en el rol del usuario
    getRoleSubject(): Subject<string> {
        return this.roleSubject; // Retorna el Subject que emite cambios en el rol
    }

    // Método para cerrar sesión del usuario
    logOut() {
        this.cookies.delete("token"); // Elimina el token de autenticación de las cookies
        localStorage.removeItem('userRole'); // Elimina el rol del usuario del localStorage
        this.role = ''; // Restablece el rol del usuario
        this.isLoggedInSubject.next(false); // Actualiza el estado de inicio de sesión
    }
}
