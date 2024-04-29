import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulariosComponent } from './formularios.component';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';

const routes: Routes = [
  { path: '', component: FormulariosComponent }, // Ruta principal
  { path: 'adoption', component: AdoptionFormComponent }, // Ruta para el formulario de adopción
  //{ path: 'volunteer', component: VolunteerFormComponent } // Ruta para el formulario de voluntariado
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulariosRoutingModule { }
