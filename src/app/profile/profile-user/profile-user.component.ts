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
  userRole: string = ''; // Variable para almacenar el rol del usuario
  imagePreviewProfile: string | FormData | null = null; // Vista previa de la imagen de perfil
  imagePreviewBackground: string | FormData | null = null; // Vista previa de la imagen de fondo
  showForm: boolean = false; // Variable para controlar la visualización del formulario
  response!: GetUserProfileResponse; // Respuesta del perfil de usuario obtenida del servidor
  update: UpdateUserRequest = {} as UpdateUserRequest; // Objeto para almacenar los datos actualizados del usuario
  request: GetUserProfileRequest = { page: 0, pageSize: 12, isLiked: false }; // Objeto de solicitud para obtener el perfil de usuario
  profileForm!: FormGroup; // Formulario reactivo para el perfil de usuario

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Al inicializar el componente, obtenemos el rol del usuario, el perfil del usuario y creamos el formulario
    this.userRole = this.userService.getRole();
    this.getUserProfile();
    this.createForm();
  }

  // Método para crear el formulario reactivo con validaciones
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

  // Método para actualizar el formulario con los datos del perfil del usuario
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
    this.update.profileImage = this.profileForm.get('profileImage')?.value;
    this.update.backgroundImage = this.profileForm.get('backgroundImage')?.value;
  }

  getUserProfile(): void {
    // Realiza una solicitud para obtener el perfil de usuario desde el servidor
    this.profileService.getUserProfile()
      .pipe()
      .subscribe(
        (data) => {
          // Al recibir los datos del perfil, los asigna a la variable y actualiza el formulario con estos datos
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
          // Maneja los errores en caso de que falle la solicitud
          console.error('Error fetching user profile', error);
        }
      );
  }

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
    // Si el formulario es inválido, marca todos los campos como tocados para mostrar los mensajes de error
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    // Verifica si todos los pasos del formulario son válidos
    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid');
      return;
    }

    this.stablishRequest();
    // Si no se ha seleccionado una nueva imagen de perfil, mantiene la imagen existente
    if (!this.profileForm.get('profileImage')?.value) {
      this.update.profileImage = this.response.profileImage;
    }

    // Si no se ha seleccionado una nueva imagen de fondo, mantiene la imagen existente
    if (!this.profileForm.get('backgroundImage')?.value) {
      this.update.backgroundImage = this.response.backgroundImage;
    }


    console.log('Request object:', this.update); // Muestra la solicitud en la consola

    // Envía la solicitud de actualización al servidor
    this.profileService.updateUser(this.update)
      .pipe()
      .subscribe(() => {
        alert("Perfil actualizado correctamente!");
        console.log("Update made"); // Muestra un mensaje en la consola indicando que se realizó la actualización
        this.router.navigate(['/profile/user']); // Navega de regreso a la lista de voluntarios
      });
  }
}
