import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaborateRoutingModule } from './colaborate-routing.module';
import { ColaborateComponent } from './colaborate.component';
import { ColaborateContentComponent } from './colaborate-content/colaborate-content.component';


@NgModule({
  declarations: [
    ColaborateComponent,
    ColaborateContentComponent
  ],
  imports: [
    CommonModule,
    ColaborateRoutingModule
  ]
})
export class ColaborateModule { }
