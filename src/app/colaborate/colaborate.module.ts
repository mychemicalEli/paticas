import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaborateRoutingModule } from './colaborate-routing.module';
import { ColaborateComponent } from './colaborate.component';


@NgModule({
  declarations: [
    ColaborateComponent
  ],
  imports: [
    CommonModule,
    ColaborateRoutingModule
  ]
})
export class ColaborateModule { }
