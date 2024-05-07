import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ShelterPaticasRoutingModule } from './shelter-paticas-routing.module';
import { ShelterPaticasComponent } from './shelter-paticas.component';
import { ShelterPaticasListComponent } from './shelter-paticas-list/shelter-paticas-list.component';
import { PaticasListComponent } from '../paticas/paticas-list/paticas-list.component';
import { PaticasModule } from '../paticas/paticas.module';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    ShelterPaticasComponent,
    ShelterPaticasListComponent,
    

  ],
  imports: [
    CommonModule,
    ShelterPaticasRoutingModule,
    NgxPaginationModule,
    // PaticasModule
  ]
})
export class ShelterPaticasModule { }
