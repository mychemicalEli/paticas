import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent {

  currentStep = 1;

  constructor(private router: Router) { }

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
