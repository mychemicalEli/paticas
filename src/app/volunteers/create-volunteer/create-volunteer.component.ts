import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateVolunteerService } from '../volunteers-service/create-volunteer.service';
import { CreateVolunteerRequest } from '../models/create-volunteer/create-volunteer.request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-volunteer',
  templateUrl: './create-volunteer.component.html',
  styleUrls: ['./create-volunteer.component.css']
})
export class CreateVolunteerComponent {
  // ViewChild para acceder a elementos del DOM
  @ViewChild('preview') preview!: ElementRef;
  @ViewChild('profileImage') profileImage!: ElementRef;

  // Booleano para verificar si se ha seleccionado una imagen
  imageSelected = false;

  // Objeto para almacenar los errores de los campos
  fieldErrors: { [key: string]: boolean } = {};

  // Objeto para almacenar los datos del formulario
  request: CreateVolunteerRequest = {} as CreateVolunteerRequest;

  // FormGroup para manejar el formulario
  form!: FormGroup;

  constructor(
    private createVolunteerService: CreateVolunteerService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private router: Router
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Creación del formulario y validación personalizada para el campo profileImage
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[9|6|7][0-9]{8}$')]],
      availability: ['', Validators.required],
      profileImage: ['']
    }, {
      validator: this.imageValidator('profileImage')
    });
  }
  
  // Validador personalizado para comprobar si se ha seleccionado una imagen
  imageValidator(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if (control.value) {
        if (control.value instanceof FileList && control.value.length === 0) {
          control.setErrors({ 'required': true });
        }
      }
    };
  }

  // Método para verificar si hay errores en los campos del formulario
  checkErrors() {
    return Object.values(this.fieldErrors).some(error => error);
  }

  // Método para establecer un error en un campo
  setFieldError(fieldName: string, hasError: boolean) {
    this.fieldErrors[fieldName] = hasError;
  }

  // Método para validar los campos del formulario antes de enviarlos
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

  // Método para establecer los datos del formulario en la solicitud de voluntario
  stablishRequest() {
    this.request.fullName = this.form.get('fullName')?.value;
    this.request.email = this.form.get('email')?.value;
    this.request.phone = this.form.get('phone')?.value;
    this.request.availability = this.form.get('availability')?.value;

    // Si el campo profileImage está presente, recoge su valor
    if (this.form.get('profileImage')) {
      const image = this.form.get('profileImage')?.value;
      if (image) {
        this.request.profileImage = image;
      }
    }
  }

  // Método para verificar si todos los pasos del formulario son válidos
  areAllStepsValid(): boolean {
    return this.form.valid;
  }

  // Método para enviar el formulario
  submitForm() {
    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid');
      return;
    }
    console.log('Submitting form...');
    console.log('Are all steps valid:', this.areAllStepsValid());

    this.stablishRequest();
    this.createVolunteerService.createVolunteer(this.request);
    this.router.navigate(['/volunteers']);
  }

  // Método para previsualizar la imagen seleccionada
  previewImage(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.renderer.setProperty(this.preview.nativeElement, 'src', reader.result);
          this.renderer.setStyle(this.preview.nativeElement, 'display', 'block');
          this.imageSelected = true;
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.removeImage();
    }
  }

  // Método para eliminar la imagen seleccionada
  removeImage() {
    this.renderer.setProperty(this.preview.nativeElement, 'src', '#');
    this.renderer.setStyle(this.preview.nativeElement, 'display', 'none');
    this.renderer.setProperty(this.profileImage.nativeElement, 'value', '');
    this.imageSelected = false;
  }
}
