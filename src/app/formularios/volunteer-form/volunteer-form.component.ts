import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateVolunteerFormRequest } from '../models/create-volunteer/create-volunteer.request';
import { VolunteerFormService } from '../service/volunteer-form.service';
import { UserService } from '../../auth/user-service/user.service';


@Component({
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.css']
})
export class VolunteerFormComponent implements OnInit {

  userRole: string = ''; // Variable para almacenar el rol del usuario
  currentStep = 1; // Variable para controlar el paso actual del formulario
  request: CreateVolunteerFormRequest = {} as CreateVolunteerFormRequest; // Solicitud de formulario de voluntario
  step2!: FormGroup; // FormGroup para el segundo paso del formulario
  step3!: FormGroup; // FormGroup para el tercer paso del formulario

  constructor(
    private formBuilder: FormBuilder,
    private volunteerFormService: VolunteerFormService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Obtener el rol del usuario al inicializar el componente
    this.userRole = this.userService.getRole();
    // Configurar validaciones y campos para el segundo paso del formulario
    this.step2 = this.formBuilder.group({
      acceptConditions: [false, Validators.requiredTrue],
    });

    // Configurar validaciones y campos para el tercer paso del formulario
    this.step3 = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      reason: ['', Validators.required],
      availability: ['', Validators.required],
      policies: ['', Validators.required],
      vehicle: ['', Validators.required],
      expectations: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      phone: ['', [Validators.required, Validators.pattern('^[9|6|7][0-9]{8}$')]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      experience: ['', Validators.required],
      skills: ['', Validators.required],
      healthLimitations: ['', Validators.required],
      trainingArea: ['', Validators.required],
      additionalQuestions: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  // Método para avanzar o retroceder en el formulario
  nextPrev(step: number) {
    this.currentStep += step;
  }

  // Método para establecer la solicitud de formulario de voluntario
  stablishRequest() {
    this.request = { ...this.step3.value, acceptConditions: this.step2.get('acceptConditions')?.value };
  }

  // Método para verificar si todos los pasos del formulario son válidos
  areAllStepsValid(): boolean {
    return this.step2.valid && this.step3.valid;
  }

  // Método para enviar el formulario
  submitForm() {
    // Marcar todos los campos del tercer paso como tocados si no son válidos
    if (this.step3.invalid) {
      this.step3.markAllAsTouched();
      return;
    }

    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid'); // Imprimir mensaje si no todos los pasos son válidos
      return;
    }
    console.log('Submitting form...');
    // Establecer la solicitud antes de enviarla
    this.stablishRequest();
    console.log('Request is valid...');
    // Enviar la solicitud de formulario de voluntario al servicio
    this.volunteerFormService.createVolunteerForm(this.request)
      .pipe()
      .subscribe()
    this.currentStep = 4; // Cambiar al paso de formulario enviado correctamente
  }

  // Método para redirigir al usuario a la página de inicio
  redirectToHome() {
    this.router.navigate(['/home']);
  }
}
