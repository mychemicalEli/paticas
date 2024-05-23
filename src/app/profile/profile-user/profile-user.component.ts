import { Component, OnInit } from '@angular/core';
import { GetUserProfileResponse } from '../models/get-user-profile/get-user-profile.response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile-service/profile.service';
import { GetUserProfileRequest } from '../models/get-user-profile/get-user-profile-paticas.request';
import { Router } from '@angular/router';
import { UserService } from '../../auth/user-service/user.service';
import { UpdateUserRequest } from '../models/update-user-profile/update-user-profile.request';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  userRole: string = '';
  imagePreviewProfile: string | FormData | null = null;
  imagePreviewBackground: string | FormData | null = null;
  showForm: boolean = false;
  response!: GetUserProfileResponse;
  update: UpdateUserRequest = {} as UpdateUserRequest;
  request: GetUserProfileRequest = { page: 0, pageSize: 12, isLiked: false };
  profileForm!: FormGroup;


  constructor(private profileService: ProfileService, private router: Router, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userRole = this.userService.getRole();
    this.getUserProfile();
    this.createForm();
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[9|6|7][0-9]{8}$')]],
      location: ['', Validators.required],
      profileImage: [null],
      backgroundImage: [null]
    });
  }

  updateFormWithUserData() {
    this.profileForm.patchValue({
      name: this.response.name,
      email: this.response.email,
      phone: this.response.phone,
      location: this.response.location,
      profileImage: this.response.profileImage,
      backgroundImage: this.response.backgroundImage,
    });
  }

  areAllStepsValid(): boolean {
    return this.profileForm.valid;
  }

  stablishRequest() {
    this.update.name = this.profileForm.get('name')?.value;
    this.update.email = this.profileForm.get('email')?.value;
    this.update.phone = this.profileForm.get('phone')?.value;
    this.update.location = this.profileForm.get('location')?.value;
    this.update.profileImage = this.profileForm.get('profileImage')?.value;
    this.update.backgroundImage = this.profileForm.get('backgroundImage')?.value;
  }

   getUserProfile(): void {
    this.profileService.getUserProfile()
      .pipe()
      .subscribe(
        (data) => {
          this.response = data;
          this.profileForm.patchValue({
            name: this.response.name,
            email: this.response.email,
            phone: this.response.phone,
            location: this.response.location,
            imagePreviewProfile: this.response.profileImage,
            imagePreviewBackground: this.response.backgroundImage,
          });
        },
        (error) => {
          console.error('Error fetching user profile', error);
        }
      );
  }

  onSelectProfileImage(event: any) {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreviewProfile = reader.result as string;
        this.profileForm.get('profileImage')?.setValue(file);
      };
    }
  }

  onSelectBackgroundImage(event: any) {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreviewBackground = reader.result as string;
        this.profileForm.get('backgroundImage')?.setValue(file);
      };
    }
  }

  deleteProfileImage() {
    this.imagePreviewProfile = '/assets/img/paticas/defaultIcon.png';
    this.profileForm.get('profileImage')?.setValue(null); // Establecer como null en el formulario
}

deleteBackgroundImage() {
    this.imagePreviewBackground = '/assets/img/paticas/defaultIcon.png';
    this.profileForm.get('backgroundImage')?.setValue(null); // Establecer como null en el formulario
}

  submitForm() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid');
      return;
    }
    this.stablishRequest(); 

    if (!this.profileForm.get('profileImage')?.value) {
      this.update.profileImage = this.response.profileImage;
  }

  // Si el campo de imagen de fondo está vacío, asigna el valor de la respuesta
  if (!this.profileForm.get('backgroundImage')?.value) {
      this.update.backgroundImage = this.response.backgroundImage;
  }


    console.log('Request object:', this.update); // Muestra la solicitud en la consola

    this.profileService.updateUser(this.update)
      .pipe()
      .subscribe(() => {
        alert("Perfil actualizado correctamente!");
        console.log("Update made"); // Muestra un mensaje en la consola indicando que se realizó la actualización
        this.router.navigate(['/profile/user']); // Navega de regreso a la lista de voluntarios
    });
  }
}
