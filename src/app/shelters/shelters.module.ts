import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SheltersRoutingModule } from './shelters-routing.module';
import { SheltersComponent } from './shelters.component';
import { ShelterListComponent } from './shelter-list/shelter-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShelterDetailComponent } from './shelter-detail/shelter-detail.component';
import { PaticasListComponent } from '../paticas/paticas-list/paticas-list.component';



@NgModule({
  declarations: [
    SheltersComponent,
    ShelterListComponent,
    ShelterDetailComponent,
  
   
  ],
  imports: [
    CommonModule,
    SheltersRoutingModule,
    FormsModule,
    NgxPaginationModule,
    
  ]
})
export class SheltersModule { }
