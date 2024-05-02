import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateVolunteerFormRequest } from '../models/create-volunteer/create-volunteer.request';
import { VolunteerFormService } from '../service/volunteer-form.service';

@Component({
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.css']
})
export class VolunteerFormComponent implements OnInit {
  currentStep = 1;

  //definimos la request
  request: CreateVolunteerFormRequest = {} as CreateVolunteerFormRequest;

  //steps
  step2!: FormGroup;
  step3!: FormGroup;

// Objeto para almacenar los errores de validación
fieldErrors: { [key: string]: boolean } = {
  name: false,
  email: false,
  address: false,
  reason: false,
  availability: false,
  policies: false,
  vehicle: false,
  expectations: false,
  age: false,
  phone: false,
  postalCode: false,
  experience: false,
  skills: false,
  healthLimitations: false,
  trainingArea: false,
  additionalQuestions: false,
  check: false
};


constructor(
  private formBuilder: FormBuilder,
  private volunteerFormService: VolunteerFormService,
  private router: Router
) {}


  ngOnInit(): void {
    //step 2 validate checkbox with terms and conditions
    this.step2 = this.formBuilder.group({
      acceptConditions: [false, Validators.requiredTrue],
    });

    //step 3 validation fields
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


  // Método para verificar si hay errores
checkErrors() {
  return Object.values(this.fieldErrors).some(error => error);
}

// Método para establecer un error
setFieldError(fieldName: string, hasError: boolean) {
  this.fieldErrors[fieldName] = hasError;
}

//validamos los campos antes de hacer el submit
  validateFields() {
    for (const controlName in this.step3.controls) {
      if (Object.prototype.hasOwnProperty.call(this.step3.controls, controlName)) {
        const control = this.step3.get(controlName);
        this.setFieldError(controlName + 'Error', !!control && control.invalid);
      }
    }
    if (this.step3.valid) {
      this.submitForm();
    }
  }

  //metodo para pasar a la pagina siguiente
  nextPrev(step: number) {
    this.currentStep += step;
  }

  //recogemos los datos para la request
  stablishRequest() {
    //step2
    this.request.acceptConditions = this.step2.get('acceptConditions')?.value;
    //step3
    this.request.fullName = this.step3.get('fullName')?.value;
    this.request.email = this.step3.get('email')?.value;
    this.request.address = this.step3.get('address')?.value;
    this.request.reason = this.step3.get('reason')?.value;
    this.request.availability = this.step3.get('availability')?.value;
    this.request.policies = this.step3.get('policies')?.value;
    this.request.vehicle = this.step3.get('vehicle')?.value;
    this.request.expectations = this.step3.get('expectations')?.value;
    this.request.age = this.step3.get('age')?.value;
    this.request.phone = this.step3.get('phone')?.value;
    this.request.postalCode = this.step3.get('postalCode')?.value;
    this.request.experience = this.step3.get('experience')?.value;
    this.request.skills = this.step3.get('skills')?.value;
    this.request.healthLimitations = this.step3.get('healthLimitations')?.value;
    this.request.trainingArea = this.step3.get('trainingArea')?.value;
    this.request.additionalQuestions = this.step3.get('additionalQuestions')?.value;
    this.request.acceptTerms = this.step3.get('acceptTerms')?.value;
  }

  //comprobamos que todos los steps sean validos
  areAllStepsValid(): boolean {
    const isValid =
      this.step2.valid &&
      this.step3.valid;
    console.log('Are all steps valid:', isValid);

    return isValid;
  }

  
  //enviamos formulario si todos los pasos son validos con los datos recogidos de la request
  submitForm() {
    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid');
      return;
    }
    console.log('Submitting form...');
    console.log('Are all steps valid:', this.areAllStepsValid());

    this.stablishRequest();
    this.volunteerFormService.createVolunteerForm(this.request);
    this.currentStep = 4;
  }


  redirectToHome() {
    // Redirect to home
    this.router.navigate(['/home']);
  }
}
