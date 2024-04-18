import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaticasRoutingModule } from './paticas-routing.module';
import { PaticasComponent } from './paticas.component';


@NgModule({
  declarations: [
    PaticasComponent
  ],
  imports: [
    CommonModule,
    PaticasRoutingModule
  ]
})
export class PaticasModule { }
