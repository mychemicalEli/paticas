import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheltersRoutingModule } from './shelters-routing.module';
import { SheltersComponent } from './shelters.component';
import { ShelterListComponent } from './shelter-list/shelter-list.component';


@NgModule({
  declarations: [
    SheltersComponent,
    ShelterListComponent
  ],
  imports: [
    CommonModule,
    SheltersRoutingModule
  ]
})
export class SheltersModule { }
