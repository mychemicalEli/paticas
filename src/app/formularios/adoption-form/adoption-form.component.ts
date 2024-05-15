import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAdoptionFormRequest } from '../models/create-adoption/create-adoption.request';
import { AdoptionFormService } from '../service/adoption-form.service';
import { UserService } from '../../auth/user-service/user.service';


@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent implements OnInit {

  userRole!: string;
  currentStep = 1;

  //declaramos la request para que no salga como undefined
  request: CreateAdoptionFormRequest = {} as CreateAdoptionFormRequest;

  //steps
  step1!: FormGroup;
  step2!: FormGroup;
  step3!: FormGroup;
  step4!: FormGroup;
  step5!: FormGroup;
  step6!: FormGroup;
  step7!: FormGroup;
  step8!: FormGroup;

  // Errores
  fieldErrors: { [key: string]: boolean } = {};


  //necesitamos el formbuilder para validar, el adoption service para hacer el post y la ruta para redirigirnos al acabar el formulario
  constructor(private userService: UserService, private formBuilder: FormBuilder, private adoptionFormService: AdoptionFormService, private router: Router) {
  }

  ngOnInit(): void {
    this.userRole = this.userService.getUserRole();
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
      jobSituation: ['', Validators.required],
      hobbies: ['', Validators.required],

    });


    //step4 validation
    this.step4 = this.formBuilder.group({
      previousPets: ['', Validators.required],
      vaccinatedRegularly: ['', Validators.required],
      currentPets: ['', Validators.required],
      shareSpace: ['', Validators.required],
      sterilizedPets: ['', Validators.required],
      opinionSterilization: ['', Validators.required],
    });


    //step5 validation
    this.step5 = this.formBuilder.group({
      whoAdoptedAndWhy: ['', Validators.required],
      whoWillWalkTheDog: ['', Validators.required],
      awareOfCosts: ['', Validators.required],
      allergyToPets: ['', Validators.required],
      pregnantSituation: ['', Validators.required],
    });

    //step6 validation
    this.step6 = this.formBuilder.group({
      petBehaviorAwareness: ['', Validators.required],
      petReturnReason: ['', Validators.required],
      petSelectionReason: ['', Validators.required],
      petSizeSelectionReason: ['', Validators.required],
      vacationPlans: ['', Validators.required],
      visitedShelter: ['', Validators.required],
      adoptionReason: ['', Validators.required],
    });

    //step7 vaidation
    this.step7 = this.formBuilder.group({
      housingType: ['', Validators.required],
      garden: ['', Validators.required],
      permission: ['', Validators.required],
      opinionMove: ['', Validators.required],
    });

    //step8 validation
    this.step8 = this.formBuilder.group({
      opinionMoreInfo: ['', Validators.required],
      consentCheckbox: [false, Validators.requiredTrue],
    });


  }


  //method to move forward to next page
  nextPrev(step: number) {
    this.currentStep += step;
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
        if (control?.invalid) {
          this.setFieldError(controlName, true);
        } else {
          this.setFieldError(controlName, false);
        }
      }
    }
    if (!this.checkErrors()) {
      this.nextPrev(1);
    }
  }

  //recuperar los campos del formulario para hacer el submit
  stablishRequest() {
    //step1
    this.request.acceptConditions = this.step1.get('acceptConditions')?.value;
    //step2
    this.request.petName = this.step2.get('petName')?.value;
    //step3
    this.request.fullName = this.step3.get('fullName')?.value;
    this.request.age = this.step3.get('age')?.value;
    this.request.email = this.step3.get('email')?.value;
    this.request.phone = this.step3.get('phone')?.value;
    this.request.address = this.step3.get('address')?.value;
    this.request.postalCode = this.step3.get('postalCode')?.value;
    this.request.peopleCount = this.step3.get('peopleCount')?.value;
    this.request.jobSituation = this.step3.get('jobSituation')?.value;
    this.request.hobbies = this.step3.get('hobbies')?.value;
    //step4
    this.request.previousPets = this.step4.get('previousPets')?.value;
    this.request.vaccinatedRegularly = this.step4.get('vaccinatedRegularly')?.value;
    this.request.currentPets = this.step4.get('currentPets')?.value;
    this.request.shareSpace = this.step4.get('shareSpace')?.value;
    this.request.sterilizedPets = this.step4.get('sterilizedPets')?.value;
    this.request.opinionSterilization = this.step4.get('opinionSterilization')?.value;
    //step5
    this.request.whoAdoptedAndWhy = this.step5.get('whoAdoptedAndWhy')?.value;
    this.request.whoWillWalkTheDog = this.step5.get('whoWillWalkTheDog')?.value;
    this.request.awareOfCosts = this.step5.get('awareOfCosts')?.value;
    this.request.allergyToPets = this.step5.get('allergyToPets')?.value;
    this.request.pregnantSituation = this.step5.get('pregnantSituation')?.value;
    //step6
    this.request.petBehaviorAwareness = this.step6.get('petBehaviorAwareness')?.value;
    this.request.petReturnReason = this.step6.get('petReturnReason')?.value;
    this.request.petSelectionReason = this.step6.get('petSelectionReason')?.value;
    this.request.petSizeSelectionReason = this.step6.get('petSizeSelectionReason')?.value;
    this.request.vacationPlans = this.step6.get('vacationPlans')?.value;
    this.request.visitedShelter = this.step6.get('visitedShelter')?.value;
    this.request.adoptionReason = this.step6.get('adoptionReason')?.value;
    //step7
    this.request.housingType = this.step7.get('housingType')?.value;
    this.request.garden = this.step7.get('garden')?.value;
    this.request.permission = this.step7.get('permission')?.value;
    this.request.opinionMove = this.step7.get('opinionMove')?.value;
    //step8
    this.request.opinionMoreInfo = this.step8.get('opinionMoreInfo')?.value;
    this.request.consentCheckbox = this.step8.get('consentCheckbox')?.value;

  }


  //Comprobar que todos los steps son validos antes de enviar el formulario

  areAllStepsValid(): boolean {
    const isValid =
      this.step1.valid &&
      this.step2.valid &&
      this.step3.valid &&
      this.step4.valid &&
      this.step5.valid &&
      this.step6.valid &&
      this.step7.valid &&
      this.step8.valid;

    console.log('Are all steps valid:', isValid);

    return isValid;
  }


  //hacer submit del formulario
  //primero comprueba que sean validos todos los steps
  //después recoge todos los datos
  //luego hace el submit con el service
  //por último pasa a la pagina final
  submitForm() {
    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid');
      return;
    }
    console.log('Submitting form...');
    console.log('Are all steps valid:', this.areAllStepsValid());

    this.stablishRequest();
    console.log('request is valid...');
    this.adoptionFormService.createAdoptionForm(this.request)
    .pipe()
    .subscribe()
    this.currentStep = 10; // Cambia al paso de formulario enviado correctamente
  }

  redirectToHome() {
    // Redirigir al inicio
    this.router.navigate(['/home']);
  }
}
