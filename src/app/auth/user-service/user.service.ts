import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: "root",
})
export class UserService {
    baseUrl = environment.baseApiUrl;
    private role: string = ''; // Variable para almacenar el rol
    private userEmail: string = ''; // Variable para almacenar el email
    private readonly roleSubject = new Subject<string>(); // Subject para emitir cambios en el rol

    constructor(private httpClient: HttpClient, private cookies: CookieService) { }

    login(user: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}auth/login`, user);
    }

    register(user: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}auth/signup`, user);
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

    isLoggedIn(): boolean {
        const token = this.getToken();
        return !!token; // Si hay un token, devuelve true; de lo contrario, devuelve false
    }

    getRoleSubject(): Subject<string> {
        return this.roleSubject;
      }
}
