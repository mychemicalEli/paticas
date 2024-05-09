import { Component, OnInit } from '@angular/core';
import { GetUserProfileResponse } from '../models/get-user-profile/get-user-profile.response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile-service/profile.service';
import { GetUserProfileRequest } from '../models/get-user-profile/get-user-profile-paticas.request';
import { Router } from '@angular/router';
import { GetUserPaticasLikedResponse, GetUserPaticasLikedItemResponse } from '../models/get-user-profile/get-user-paticas-liked.response';
import { GetUserSheltersLikedResponse, GetUserSheltersLikedItemResponse } from '../models/get-user-profile/get-user-shelters-liked.response'; // Importa las definiciones necesarias

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  showForm: boolean = false;
  response!: GetUserProfileResponse;
  request: GetUserProfileRequest = { page: 0, pageSize: 12, isLiked: false };
  profileForm!: FormGroup;

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  private getUserProfile(): void {
    this.profileService.getUserProfile().subscribe({
      next: (response: GetUserProfileResponse) => {
        this.response = response;
      },
      error: (error) => {
        console.error('Error al obtener el perfil', error);
      }
    });
  }

}