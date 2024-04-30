import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulariosRoutingModule } from './formularios-routing.module';
import { FormulariosComponent } from './formularios.component';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VolunteerFormComponent } from './volunteer-form/volunteer-form.component';


@NgModule({
  declarations: [
    FormulariosComponent,
    AdoptionFormComponent,
    VolunteerFormComponent
  ],
  imports: [
    CommonModule,
    FormulariosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FormulariosModule { }
