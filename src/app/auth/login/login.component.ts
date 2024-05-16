import { Component } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256'; // Importa la función de hash SHA-256

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  error: string = "";

  constructor(private userService: UserService, private router: Router) { }

  login() {
    // Convertir el email a minúsculas
    const emailLowerCase = this.email.toLowerCase();

    // Validar campos vacíos
    if (!emailLowerCase || !this.password) {
      this.error = "Por favor ingresa tu correo electrónico y contraseña.";
      return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailLowerCase)) {
      this.error = "Por favor ingresa un correo electrónico válido.";
      return;
    }

    // Encriptar la contraseña con SHA-256
    const hashedPassword = sha256(this.password);

    const user = { email: emailLowerCase, password: hashedPassword }; // Envía la contraseña encriptada
    this.userService.login(user)
      .subscribe((data: any) => {
        const role = this.userService.getUserRole(emailLowerCase);
        if (!role) {
          this.error = "Correo electrónico o contraseña incorrectos.";
          return;
        }
        this.userService.setToken(data.token);
        this.userService.setRole(role);
        if (role === 'user') {
          this.router.navigateByUrl("/home");
        } else if (role === 'shelterAdmin') {
          this.router.navigateByUrl("/shelterPaticas");
        } else {
          console.log("Rol no reconocido");
        }
      },
      error => {
        console.log(error);
        this.error = "Correo electrónico o contraseña no válidos.";
      });
  }
}
