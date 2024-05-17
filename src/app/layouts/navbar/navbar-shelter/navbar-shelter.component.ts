import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from '../../../profile/profile-service/profile.service';

@Component({
  selector: 'app-navbar-shelter',
  templateUrl: './navbar-shelter.component.html',
  styleUrl: './navbar-shelter.component.css',
})
export class NavbarShelterComponent implements OnInit {
  shelterProfileImage: string| FormData | null = null;
  constructor(private cookies: CookieService, private router: Router, private profileService: ProfileService){}
  ngOnInit(): void {
    // Recupera la imagen de perfil del usuario al inicializar el componente
    this.getShelterProfileImage();
  }

  getShelterProfileImage() {
    this.profileService.getShelterProfile().subscribe(
      (response) => {
        this.shelterProfileImage = response.profileImage;
      },
      (error) => {
        console.error('Error retrieving user profile image:', error);
      }
    );
  }
  
  logOut(){
    this.cookies.delete("token");
    this.router.navigate(['/auth/login']);
  }
}
