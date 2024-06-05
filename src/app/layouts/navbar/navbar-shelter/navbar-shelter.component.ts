import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from '../../../profile/profile-service/profile.service';
import { GetShelterProfileResponse } from '../../../profile/models/get-shelter-profile/get-shelter-profile.response';
import { UserService } from '../../../auth/user-service/user.service';

@Component({
  selector: 'app-navbar-shelter',
  templateUrl: './navbar-shelter.component.html',
  styleUrl: './navbar-shelter.component.css',
})
export class NavbarShelterComponent implements OnInit {
  shelterProfileImage: string | FormData | null = null; // Variable para almacenar la imagen de perfil del refugio
  response?: GetShelterProfileResponse; // Variable para almacenar la respuesta del perfil del refugio

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private userService: UserService) { }

  ngOnInit(): void {
    // Llama al método para obtener la imagen de perfil del refugio al inicializar el componente
    this.getShelterProfileImage();
  }

  // Método para obtener la imagen de perfil del refugio
  getShelterProfileImage() {
    this.profileService.getShelterProfile()
      .pipe()
      .subscribe(
        (response) => {
          this.shelterProfileImage = response.profileImage; // Actualiza la imagen de perfil del refugio
        }
      );
  }

  // Método para cerrar sesión
  logOut() {
    this.userService.logOut(); // Llama al método de cierre de sesión del servicio de usuario
    this.router.navigate(['/auth/login']); // Navega a la página de inicio de sesión después de cerrar sesión
  }
}
