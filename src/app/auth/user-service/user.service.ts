import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: "root",
})

export class UserService {
    baseUrl = environment.baseApiUrl;

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

      getUserLogged() {
        const token = this.getToken();
        // Aquí iría el endpoint para devolver el usuario para un token
      }
}