import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../auth/user-service/user.service';
import { ProfileService } from '../../../profile/profile-service/profile.service';


@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.css',
})
export class NavbarUserComponent implements OnInit {
  userProfileImage: string| FormData | null = null;
  constructor(private cookies: CookieService, private router: Router, private profileService: ProfileService){}

  ngOnInit(): void {
    // Recupera la imagen de perfil del usuario al inicializar el componente
    this.getUserProfileImage();
  }

  getUserProfileImage() {
    this.profileService.getUserProfile().subscribe(
      (response) => {
        this.userProfileImage = response.profileImage;
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
