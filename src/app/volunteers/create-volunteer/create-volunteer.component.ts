import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateVolunteerRequest } from '../models/create-volunteer/create-volunteer.request';
import { Router } from '@angular/router';
import { VolunteerService } from '../volunteers-service/volunteers.service';
import { UserService } from '../../auth/user-service/user.service';

@Component({
  selector: 'app-create-volunteer',
  templateUrl: './create-volunteer.component.html',
  styleUrls: ['./create-volunteer.component.css']
})

export class CreateVolunteerComponent {
  @ViewChild('profileImage') profileImage!: ElementRef; // Referencia al input file para obtener la imagen seleccionada

  userRole!:string;
  imageSelected = false; // Indica si se ha seleccionado una imagen
  url: any = ''; // Almacena la URL de la imagen seleccionada
  fieldErrors: { [key: string]: boolean } = {}; // Almacena los errores de los campos del formulario
  request: CreateVolunteerRequest = {} as CreateVolunteerRequest; // Almacena la información para la solicitud de creación
  form!: FormGroup; // Representa el formulario de creación de voluntarios

  
  constructor(
    private volunteerService: VolunteerService, // Servicio de voluntarios
    private formBuilder: FormBuilder, // Constructor de formularios
    private router: Router, // Enrutador
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userRole = this.userService.getUserRole();
    this.createForm(); // Inicialización del formulario
  }

  // Método para crear el formulario y definir las validaciones
  createForm(): void {
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required], // Control para el nombre completo
      email: ['', [Validators.required, Validators.email]], // Control para el correo electrónico
      phone: ['', [Validators.required, Validators.pattern('^[9|6|7][0-9]{8}$')]], // Control para el teléfono
      availability: ['', Validators.required], // Control para la disponibilidad
      profileImage: [''] // Control para la imagen de perfil
    }, {
      validator: this.imageValidator('profileImage') // Validador personalizado para la imagen
    });
  }

  // Validador personalizado para comprobar si se ha seleccionado una imagen
  imageValidator(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if (control.value instanceof FileList && control.value.length === 0) {
        control.setErrors({ 'required': true });
      }
    };
  }

  // Verifica si hay errores en los campos del formulario
  checkErrors() {
    return Object.values(this.fieldErrors).some(error => error);
  }

  // Establece un error en un campo del formulario
  setFieldError(fieldName: string, hasError: boolean) {
    this.fieldErrors[fieldName] = hasError;
  }

  // Valida los campos del formulario antes de enviarlos
  validateFields() {
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      this.setFieldError(controlName, control?.invalid || false);
    });

    // Validar específicamente el campo de disponibilidad
    if (!this.form.get('availability')?.value) {
      this.setFieldError('availability', true);
    }

    if (!this.checkErrors()) {
      this.submitForm();
    }
  }

  // Establece los datos del formulario en la solicitud de voluntario
  stablishRequest() {
    this.request.fullName = this.form.get('fullName')?.value; // Establece el nombre completo
    this.request.email = this.form.get('email')?.value; // Establece el correo electrónico
    this.request.phone = this.form.get('phone')?.value; // Establece el teléfono
    this.request.availability = parseInt(this.form.get('availability')?.value); // Establece la disponibilidad

    // Si se ha seleccionado una imagen, se recoge su valor
    const file = this.form.get('profileImage')?.value;
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);
      this.request.profileImage = formData;
    }
  }

  // Verifica si todos los pasos del formulario son válidos
  areAllStepsValid(): boolean {
    return this.form.valid;
  }

  // Envia el formulario
  submitForm() {
    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid');
      return;
    }
    console.log('Submitting form...');
    console.log('Are all steps valid:', this.areAllStepsValid());
    this.stablishRequest(); // Establece la solicitud de creación con los datos del formulario
    console.log('Request stablished...');
    console.log('Request object:', this.request); // Muestra la solicitud en la consola
    this.volunteerService.createVolunteer(this.request)
    .pipe()
    .subscribe()
   
    console.log('volunteer created...');
    this.router.navigate(['/volunteers']); // Navega a la lista de voluntarios
  }

  // Maneja el evento de selección de archivo (para poner bonito el input file)
  onSelectFile(event: any) {
    const file = event.target.files[0]; // Obtiene el archivo directamente
    if (file) {
      this.imageSelected = true; // Indica que se ha seleccionado una imagen
      const reader = new FileReader(); // Crea un lector de archivos
      reader.readAsDataURL(file); // Lee el archivo como una URL
      reader.onload = () => {
        this.url = reader.result; // Establece la URL de la imagen
      };
      this.form.get('profileImage')?.setValue(file); // Establece el valor como el archivo
    }
  }

  // Elimina la imagen seleccionada y limpia el campo de la imagen en el formulario
  delete() {
    this.url = null; // Elimina la URL de la imagen
    this.form.get('profileImage')?.setValue(null); // Limpia el campo de la imagen
  }
}
