import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile-service/profile.service';
import { GetShelterProfileResponse } from '../models/get-shelter-profile/get-shelter-profile.response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../auth/user-service/user.service';

@Component({
  selector: 'app-profile-shelter',
  templateUrl: './profile-shelter.component.html',
  styleUrls: ['./profile-shelter.component.css']
})
export class ProfileShelterComponent implements OnInit {

  userRole: string='';
  showForm: boolean = false;
  shelterProfile?: GetShelterProfileResponse ;

  


  constructor(private profileService: ProfileService, private formBuilder: FormBuilder, private userService:UserService) {}

  ngOnInit(): void {
    this.userRole = this.userService.getRole();
    this.getShelterProfile();
  }


  private getShelterProfile(): void {
    this.profileService.getShelterProfile()
    .pipe()
    .subscribe({
      next: (response: GetShelterProfileResponse) => {
        this.shelterProfile = response;
      },
      error: (error) => {
        console.error('Error al obtener el perfil del refugio:', error);
      }
    });
  }
}
