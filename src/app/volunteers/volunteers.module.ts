import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VolunteersRoutingModule } from './volunteers-routing.module';
import { VolunteersComponent } from './volunteers.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    VolunteersComponent,
    VolunteersListComponent,
    
  ],
  imports: [
    CommonModule,
    VolunteersRoutingModule,
    NgxPaginationModule
  ]
})
export class VolunteersModule { }
