import { Component, OnInit } from '@angular/core';
import { GetUserProfileResponse } from '../models/get-user-profile/get-user-profile.response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile-service/profile.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css'
})
export class ProfileUserComponent implements OnInit {
  showForm: boolean = false;

  userProfile?: GetUserProfileResponse ;

  profileForm!: FormGroup;


  constructor(private profileService: ProfileService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  private getUserProfile(): void {
    this.profileService.getUserProfile().subscribe({
      next: (response: GetUserProfileResponse) => {
        this.userProfile = response;
      },
      error: (error) => {
        console.error('Error al obtener el perfil del refugio:', error);
      }
    });
  }
}
