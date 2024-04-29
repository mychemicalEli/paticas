import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaticasRoutingModule } from './paticas-routing.module';
import { PaticasComponent } from './paticas.component';
import { PaticasListComponent } from './paticas-list/paticas-list.component';
import { PaticaDetailComponent } from './patica-detail/patica-detail.component';


import { ReactiveFormsModule } from '@angular/forms';
import { FormulariosComponent } from '../formularios/formularios.component';

@NgModule({
  declarations: [
    PaticasComponent,
    PaticasListComponent,
    PaticaDetailComponent,
  
  ],
  imports: [
    CommonModule,
    PaticasRoutingModule,
    NgxPaginationModule,
  ]
})
export class PaticasModule { }
