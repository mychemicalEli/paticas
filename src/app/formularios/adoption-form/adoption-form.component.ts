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
  step1!: FormGroup;
  step2!: FormGroup;
  step3!: FormGroup;
  step4!: FormGroup;
  step5!: FormGroup;
  step6!: FormGroup;
  step7!: FormGroup;
  step8!: FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.step1 = this.formBuilder.group({
      acceptConditions: [false, Validators.requiredTrue],
    });

    this.step2 = this.formBuilder.group({
      petName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]]
    });

    // Inicializa los otros formularios aquí
    this.step3 = this.formBuilder.group({});
    this.step4 = this.formBuilder.group({});
    this.step5 = this.formBuilder.group({});
    this.step6 = this.formBuilder.group({});
    this.step7 = this.formBuilder.group({});
    this.step8 = this.formBuilder.group({});
  
    
  }
  


  nextPrev(step: number) {
    this.currentStep += step;
  }

  submitForm() {
    // Aquí puedes agregar la lógica para enviar el formulario
    this.currentStep = 10; // Cambia al paso de formulario enviado correctamente
  }

  redirectToHome() {
    // Redirigir al inicio
    this.router.navigate(['/home']);
  }
}
