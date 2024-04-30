import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.css']
})
export class VolunteerFormComponent implements OnInit {
  currentStep = 1;

  //steps
  step2!: FormGroup;
  step3!: FormGroup;

  //step3 field to validate
  nameError: boolean = false;
  ageError: boolean = false;
  emailError: boolean = false;
  phoneError: boolean = false;
  addressError: boolean = false;
  postalCodeError: boolean = false;
  checkError: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    //step 2 validate checkbox with terms and conditions
    this.step2 = this.formBuilder.group({
      acceptConditions: [false, Validators.requiredTrue],
    });

    //step 3 validation fields
    this.step3 = this.formBuilder.group({
      fullName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[9|6|7][0-9]{8}$')]],
      address: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      acceptConditions: [false, Validators.requiredTrue]
    });
    
  }


submitForm() {
  this.currentStep = 4; 
}

validateFields() {
  const fieldsToValidate = [
    { name: 'fullName', errorProperty: 'nameError' },
    { name: 'age', errorProperty: 'ageError' },
    { name: 'email', errorProperty: 'emailError' },
    { name: 'phone', errorProperty: 'phoneError' },
    { name: 'address', errorProperty: 'addressError' },
    { name: 'postalCode', errorProperty: 'postalCodeError' },
    { name: 'acceptConditions', errorProperty: 'checkError' }
  ];

 let allValid = true;
  
    fieldsToValidate.forEach(field => {
      const control = this.step3.get(field.name);
      const error = !!control && control.invalid;
      this.setProperty(field.errorProperty, error);
      if (error) {
        allValid = false;
      }
    });
  
    if (allValid) {
      this.submitForm(); 
    }
  }

  nextPrev(step: number) {
    this.currentStep += step;
  }

  // method to assign boolean value to validation property
  setProperty(propertyName: string, value: boolean) {
    (this as any)[propertyName] = value;
  }

  redirectToHome() {
    // Redirect to home
    this.router.navigate(['/home']);
  }
}
