import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VolunteersRoutingModule } from './volunteers-routing.module';
import { VolunteersComponent } from './volunteers.component';


@NgModule({
  declarations: [
    VolunteersComponent
  ],
  imports: [
    CommonModule,
    VolunteersRoutingModule
  ]
})
export class VolunteersModule { }
