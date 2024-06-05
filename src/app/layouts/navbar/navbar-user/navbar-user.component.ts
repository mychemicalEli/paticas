import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../auth/user-service/user.service';
import { ProfileService } from '../../../profile/profile-service/profile.service';
import { GetUserProfileResponse } from '../../../profile/models/get-user-profile/get-user-profile.response';


@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.css',
})
export class NavbarUserComponent implements OnInit {
  userProfileImage: string | FormData | null = null; // Variable para almacenar la imagen de perfil del usuario
  response?: GetUserProfileResponse; // Variable para almacenar la respuesta del perfil del usuario

  constructor(private cookies: CookieService, private router: Router, private profileService: ProfileService, private userService: UserService) { }

  ngOnInit(): void {
    // Llama al método para obtener la imagen de perfil del usuario al inicializar el componente
    this.getUserProfileImage();
  }

  // Método para obtener la imagen de perfil del usuario
  getUserProfileImage() {
    this.profileService.getUserProfile()
      .pipe()
      .subscribe(
        (response) => {
          this.userProfileImage = response.profileImage;
        }
      );
  }

  // Método para cerrar sesión
  logOut() {
    this.userService.logOut(); // Llama al método de cierre de sesión del servicio de usuario
    this.router.navigate(['/auth/login']); // Navega a la página de inicio de sesión después de cerrar sesión
  }
}
