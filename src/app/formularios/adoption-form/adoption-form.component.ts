import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent implements OnInit {

  currentStep = 1;

  //steps
  step1!: FormGroup;
  step2!: FormGroup;
  step3!: FormGroup;
  step4!: FormGroup;
  step5!: FormGroup;
  step6!: FormGroup;
  step7!: FormGroup;
  step8!: FormGroup;

  //step3 field to validate
  nameError: boolean = false;
  ageError: boolean = false;
  emailError: boolean =false;
  phoneError: boolean =false;
  addressError: boolean =false;
  postalCodeError: boolean =false;
  peopleCountError: boolean =false;



  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    //step 1 validate checkbox with terms and conditions
    this.step1 = this.formBuilder.group({
      acceptConditions: [false, Validators.requiredTrue],
    });

    //step 2 validate name
    this.step2 = this.formBuilder.group({
      petName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]]
    });

    //step 3 validation fields
    this.step3 = this.formBuilder.group({
      fullName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[9|6|7][0-9]{8}$')]],
      address: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      peopleCount: ['', Validators.required],
  
    });
    
  
    this.step4 = this.formBuilder.group({});
    this.step5 = this.formBuilder.group({});
    this.step6 = this.formBuilder.group({});
    this.step7 = this.formBuilder.group({});
    
    this.step8 = this.formBuilder.group({
      consentCheckbox: [false, Validators.requiredTrue],
    });
  
    
  }
  

  //method to move forward to next page
  nextPrev(step: number) {
    this.currentStep += step;
  }

  //method to validate fields in step 3
  validateFields3() {
    const fieldsToValidate = [
      { name: 'fullName', errorProperty: 'nameError' },
      { name: 'age', errorProperty: 'ageError' },
      { name: 'email', errorProperty: 'emailError' },
      { name: 'phone', errorProperty: 'phoneError' },
      { name: 'address', errorProperty: 'addressError' },
      { name: 'postalCode', errorProperty: 'postalCodeError' },
      { name: 'peopleCount', errorProperty: 'peopleCountError' }
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
      this.nextPrev(1); 
    }
  }
  
  // method to asign boolean value to validation property
  setProperty(propertyName: string, value: boolean) {
    (this as any)[propertyName] = value;
  }
  



  submitForm() {
    this.currentStep = 10; // Cambia al paso de formulario enviado correctamente
  }

  redirectToHome() {
    // Redirigir al inicio
    this.router.navigate(['/home']);
  }
}
