import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaticasRoutingModule } from './paticas-routing.module';
import { PaticasComponent } from './paticas.component';
import { PaticasListComponent } from './paticas-list/paticas-list.component';


@NgModule({
  declarations: [
    PaticasComponent,
    PaticasListComponent
  ],
  imports: [
    CommonModule,
    PaticasRoutingModule
  ]
})
export class PaticasModule { }
