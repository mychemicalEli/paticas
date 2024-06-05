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

  userRole: string = ''; // Variable para almacenar el rol del usuario
  showForm: boolean = false; // Variable para controlar la visualización del formulario
  shelterProfile!: GetShelterProfileResponse; // Perfil del refugio obtenido del servidor
  imagePreviewProfile: string | FormData | null = null; // Vista previa de la imagen de perfil
  imagePreviewBackground: string | FormData | null = null; // Vista previa de la imagen de fondo
  update: UpdateShelterUserRequest = {} as UpdateShelterUserRequest; // Objeto para almacenar los datos actualizados
  profileForm!: FormGroup; // Formulario reactivo para el perfil del refugio


  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    // Al inicializar el componente, obtenemos el rol del usuario, el perfil del refugio y creamos el formulario
    this.userRole = this.userService.getRole();
    this.getShelterProfile();
    this.createForm();
  }

  // Método para crear el formulario reactivo con validaciones
  createForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[9|6|7][0-9]{8}$')]],
      location: [''],
      description: ['', Validators.required],
      cif: ['', [Validators.required, Validators.pattern(/^(\d{8}[a-zA-Z]|\d{1}[a-zA-Z]\d{7}|[a-zA-Z]\d{8}|\d{8}-[a-zA-Z]|\d{1}-[a-zA-Z]\d{7}|[a-zA-Z]-\d{8})$/)]],
      profileImage: [null],
      backgroundImage: [null]
    });
  }

  // Método para actualizar el formulario con los datos del perfil del refugio
  updateFormWithUserData() {
    this.profileForm.patchValue({
      name: this.shelterProfile.name,
      email: this.shelterProfile.email,
      phone: this.shelterProfile.phone,
      location: this.shelterProfile.location,
      description: this.shelterProfile.description,
      cif: this.shelterProfile.CIF,
      profileImage: this.shelterProfile.profileImage,
      backgroundImage: this.shelterProfile.backgroundImage,
    });
  }

  // Verifica si todos los pasos del formulario son válidos
  areAllStepsValid(): boolean {
    return this.profileForm.valid;
  }

  // Prepara el objeto de solicitud para enviar los datos de actualización al servidor
  stablishRequest() {
    this.update.name = this.profileForm.get('name')?.value;
    this.update.email = this.profileForm.get('email')?.value;
    this.update.phone = this.profileForm.get('phone')?.value;
    this.update.location = this.profileForm.get('location')?.value;
    this.update.description = this.profileForm.get('description')?.value;
    this.update.cif = this.profileForm.get('cif')?.value;
    this.update.profileImage = this.profileForm.get('profileImage')?.value;
    this.update.backgroundImage = this.profileForm.get('backgroundImage')?.value;
  }



  // Realiza una solicitud para obtener el perfil del refugio desde el servidor
  private getShelterProfile(): void {
    this.profileService.getShelterProfile()
      .pipe()
      .subscribe(
        (data) => {
          // Al recibir los datos del perfil, los asigna a la variable y actualiza el formulario con estos datos
          this.shelterProfile = data;
          this.profileForm.patchValue({
            name: this.shelterProfile.name,
            email: this.shelterProfile.email,
            phone: this.shelterProfile.phone,
            location: this.shelterProfile.location,
            description: this.shelterProfile.description,
            cif: this.shelterProfile.CIF,
            imagePreviewProfile: this.shelterProfile.profileImage,
            imagePreviewBackground: this.shelterProfile.backgroundImage,
          });
        },
        (error) => {
          // Maneja los errores en caso de que falle la solicitud
          console.error('Error fetching user profile', error);
        }
      );
  }

  // Métodos para manejar la selección de imágenes y eliminarlas

  // Maneja la selección de la imagen de perfil
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

  // Maneja la selección de la imagen de fondo
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

  // Elimina la imagen de perfil seleccionada y restablece el valor en el formulario
  deleteProfileImage() {
    this.imagePreviewProfile = '/assets/img/paticas/defaultIcon.png';
    this.profileForm.get('profileImage')?.setValue(null); // Establecer como null en el formulario
  }

  // Elimina la imagen de fondo seleccionada y restablece el valor en el formulario
  deleteBackgroundImage() {
    this.imagePreviewBackground = '/assets/img/paticas/defaultIcon.png';
    this.profileForm.get('backgroundImage')?.setValue(null); // Establecer como null en el formulario
  }

  // Se dispara al enviar el formulario
  submitForm() {
    if (this.profileForm.invalid) {
      // Si el formulario es inválido, marca todos los campos como tocados para mostrar los mensajes de error
      this.profileForm.markAllAsTouched();
      return;
    }

    // Verifica si todos los pasos del formulario son válidos
    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid');
      return;
    }

    this.stablishRequest(); // Prepara la solicitud de actualización

    // Si no se ha seleccionado una nueva imagen de perfil, mantiene la imagen existente
    if (!this.profileForm.get('profileImage')?.value) {
      this.update.profileImage = this.shelterProfile.profileImage;
    }

    // Si no se ha seleccionado una nueva imagen de fondo, mantiene la imagen existente
    if (!this.profileForm.get('backgroundImage')?.value) {
      this.update.backgroundImage = this.shelterProfile.backgroundImage;
    }

    console.log('Request object:', this.update); // Muestra la solicitud en la consola

    // Envía la solicitud de actualización al servidor
    this.profileService.updateShelter(this.update)
      .pipe()
      .subscribe(() => {
        alert("Perfil actualizado correctamente!");

        console.log("Update made"); // Muestra un mensaje en la consola indicando que se realizó la actualización
        this.router.navigate(['/profile/shelter']); // Navega de regreso a la lista de voluntarios
      });
  }


}
