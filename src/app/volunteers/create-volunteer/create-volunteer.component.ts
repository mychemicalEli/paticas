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

  userRole:string='';
  imageSelected = false; // Indica si se ha seleccionado una imagen
  url: any = ''; // Almacena la URL de la imagen seleccionada
  request: CreateVolunteerRequest = {} as CreateVolunteerRequest; // Almacena la información para la solicitud de creación
  form!: FormGroup; // Representa el formulario de creación de voluntarios

  
  constructor(
    private volunteerService: VolunteerService, // Servicio de voluntarios
    private formBuilder: FormBuilder, // Constructor de formularios
    private router: Router, // Enrutador
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userRole = this.userService.getRole();
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

  
  // Establece los datos del formulario en la solicitud de voluntario
  stablishRequest(): FormData {
    const formData = new FormData();  
    formData.append('fullName', this.form.get('fullName')?.value);
    formData.append('email', this.form.get('email')?.value);
    formData.append('phone', this.form.get('phone')?.value);
    formData.append('availability', this.form.get('availability')?.value);
    formData.append('shelterId', '10'); 
  
    const file = this.form.get('profileImage')?.value;
    if (file) {
      formData.append('profileImage', file);
    }
    
    return formData;
  }
  
  
  
  
  


  // Verifica si todos los pasos del formulario son válidos
  areAllStepsValid(): boolean {
    return this.form.valid;
  }

  // Envia el formulario
  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid');
      return;
    }
  
    const formData = this.stablishRequest(); 
  
    this.volunteerService.createVolunteer(formData)
      .subscribe({
        next: () => {
          console.log('Volunteer created...');
          this.router.navigate(['/volunteers']);
        },
        error: (error) => {
          console.error('Error occurred while adding volunteer:', error);
        },
        complete: () => {
          console.log('volunteer added successfully');
        }
      });
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
