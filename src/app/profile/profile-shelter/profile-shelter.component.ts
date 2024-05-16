import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile-service/profile.service';
import { GetShelterProfileResponse } from '../models/get-shelter-profile/get-shelter-profile.response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../auth/user-service/user.service';
import { UpdateShelterUserRequest } from '../models/update-shelter-profile/update-shelter-profile.request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-shelter',
  templateUrl: './profile-shelter.component.html',
  styleUrls: ['./profile-shelter.component.css']
})
export class ProfileShelterComponent implements OnInit {

  userRole: string='';
  showForm: boolean = false;
  shelterProfile!: GetShelterProfileResponse ;
  imagePreviewProfile: string | FormData | null = null;
  imagePreviewBackground: string | FormData | null = null;
  update: UpdateShelterUserRequest = {} as UpdateShelterUserRequest;
  profileForm!: FormGroup;

  
  constructor(
    private profileService: ProfileService, 
    private formBuilder: FormBuilder, 
    private userService:UserService, 
    private router: Router){}

  ngOnInit(): void {
    this.userRole = this.userService.getRole();
    this.getShelterProfile();
    this.createForm();
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      location: [''],
      cif:[''],
      profileImage: [null],
      backgroundImage: [null]
    });
  }

  updateFormWithUserData() {
    this.profileForm.patchValue({
      name: this.shelterProfile.name,
      email: this.shelterProfile.email,
      phone: this.shelterProfile.phone,
      location: this.shelterProfile.location,
      cif: this.shelterProfile.CIF,
      profileImage: this.shelterProfile.profileImage,
      backgroundImage: this.shelterProfile.backgroundImage,
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
    this.update.cif = this.profileForm.get('cif')?.value;
    this.update.profileImage = this.profileForm.get('profileImage')?.value;
    this.update.backgroundImage = this.profileForm.get('backgroundImage')?.value;
  }



  private getShelterProfile(): void {
    this.profileService.getShelterProfile()
      .pipe()
      .subscribe(
        (data) => {
          this.shelterProfile = data;
          this.profileForm.patchValue({
            name: this.shelterProfile.name,
            email: this.shelterProfile.email,
            phone: this.shelterProfile.phone,
            location: this.shelterProfile.location,
            cif: this.shelterProfile.CIF,
            imagePreviewProfile: this.shelterProfile.profileImage,
            imagePreviewBackground: this.shelterProfile.backgroundImage,
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
  if (!this.areAllStepsValid()) {
    console.log('Not all steps are valid');
    return;
  }
  this.stablishRequest(); 

  if (!this.profileForm.get('profileImage')?.value) {
    this.update.profileImage = this.shelterProfile.profileImage;
}

// Si el campo de imagen de fondo está vacío, asigna el valor de la respuesta
if (!this.profileForm.get('backgroundImage')?.value) {
    this.update.backgroundImage = this.shelterProfile.backgroundImage;
}

  console.log('Request object:', this.update); // Muestra la solicitud en la consola

  this.profileService.updateShelter(this.update)
    .pipe()
    .subscribe(() => {
      alert("Perfil actualizado correctamente!");

      console.log("Update made"); // Muestra un mensaje en la consola indicando que se realizó la actualización
      this.router.navigate(['/profile/shelter']); // Navega de regreso a la lista de voluntarios
  });
}


}
