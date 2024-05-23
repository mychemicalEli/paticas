import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { sha256 } from 'js-sha256'; 

@Injectable({
    providedIn: "root",
})
export class UserService {
    baseUrl = environment.baseApiUrl;
    private role: string = ''; // Variable para almacenar el rol
    private userEmail: string = ''; // Variable para almacenar el email
    private isLoggedInSubject = new BehaviorSubject<boolean>(false); 
    private readonly roleSubject = new Subject<string>(); // Subject para emitir cambios en el rol

    constructor(private httpClient: HttpClient, private cookies: CookieService) { }

    login(user: any): Observable<any> {
        console.log('Datos enviados al backend:', user);
        return this.httpClient.post(`${this.baseUrl}auth/login`, user);
    }

    register(user: any): Observable<any> {
         // Encriptar la contraseña antes de enviarla al servidor
    const encryptedPassword = sha256(user.password);

    // Crear una copia del usuario con la contraseña encriptada
    const userWithEncryptedPassword = { ...user, password: encryptedPassword };
        return this.httpClient.post(`${this.baseUrl}auth/signup`, userWithEncryptedPassword);
    }

    setToken(token: string) {
        this.cookies.set("token", token);
    }

    getToken() {
        return this.cookies.get("token");
    }

    setRole(role: string) {
        this.role = role;
        this.roleSubject.next(role); // Emitir el cambio de rol
    }

    getRole(): string {
        return this.role;
    }

    setUserEmail(email: string) {
        this.userEmail = email;
    }

    getUserEmail(): string {
        return this.userEmail;
    }

    getUserRole(email?: string): string {
        if (email) {
            this.setUserEmail(email);
        }
        const userEmail = this.getUserEmail();
        if (userEmail === "user@example.com") {
            return "user";
        } else if (userEmail === "admin@example.com") {
            return "shelterAdmin";
        } else {
            return ""; // En caso de que no se encuentre el rol
        }
    }

    isLoggedIn(): Observable<boolean> {
        const token = this.getToken();
        const isLoggedIn = !!token; // Si hay un token, el usuario está conectado
    
        // Actualizar el estado de inicio de sesión en el BehaviorSubject
        this.isLoggedInSubject.next(isLoggedIn);
    
        return this.isLoggedInSubject.asObservable(); // Devuelve el BehaviorSubject como Observable
    }

    getRoleSubject(): Subject<string> {
        return this.roleSubject;
      }
}
