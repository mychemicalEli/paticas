import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileShelterComponent } from './profile-shelter/profile-shelter.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileUserComponent } from './profile-user/profile-user.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileShelterComponent,
    ProfileUserComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProfileModule { }
