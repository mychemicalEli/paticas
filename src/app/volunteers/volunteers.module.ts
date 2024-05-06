import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VolunteersRoutingModule } from './volunteers-routing.module';
import { VolunteersComponent } from './volunteers.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateVolunteerComponent } from './create-volunteer/create-volunteer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateVolunteerComponent } from './update-volunteer/update-volunteer.component';


@NgModule({
  declarations: [
    VolunteersComponent,
    VolunteersListComponent,
    CreateVolunteerComponent,
    UpdateVolunteerComponent,
    
  ],
  imports: [
    CommonModule,
    VolunteersRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  
  ]
})
export class VolunteersModule { }
