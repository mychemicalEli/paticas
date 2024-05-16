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

  userRole: string= '';
  currentStep = 1;
  request: CreateVolunteerFormRequest = {} as CreateVolunteerFormRequest;
  step2!: FormGroup;
  step3!: FormGroup;
  fieldErrors: { [key: string]: boolean } = {};

  constructor(
    private formBuilder: FormBuilder,
    private volunteerFormService: VolunteerFormService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userRole = this.userService.getRole();
    this.step2 = this.formBuilder.group({
      acceptConditions: [false, Validators.requiredTrue],
    });

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

  checkErrors() {
    return Object.values(this.fieldErrors).some(error => error);
  }

  setFieldError(fieldName: string, hasError: boolean) {
    this.fieldErrors[fieldName] = hasError;
  }

  validateFields() {
    Object.keys(this.step3.controls).forEach(controlName => {
      const control = this.step3.get(controlName);
      this.setFieldError(controlName, control?.invalid || false);
    });
    if (!this.checkErrors()) {
      this.submitForm();
    }
  }

  nextPrev(step: number) {
    this.currentStep += step;
  }

  stablishRequest() {
    this.request = { ...this.step3.value, acceptConditions: this.step2.get('acceptConditions')?.value };
  }

  areAllStepsValid(): boolean {
    return this.step2.valid && this.step3.valid;
  }

  submitForm() {
    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid');
      return;
    }
    console.log('Submitting form...');
    this.stablishRequest();
    console.log('Request is valid...');
    this.volunteerFormService.createVolunteerForm(this.request)
    .pipe()
    .subscribe()
    this.currentStep = 4;
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }
}
