import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileShelterComponent } from './profile-shelter/profile-shelter.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaticasLikedComponent } from './paticas-liked/paticas-liked.component';
import { SheltersLikedComponent } from './shelters-liked/shelters-liked.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileShelterComponent,
    ProfileUserComponent,
    PaticasLikedComponent,
    SheltersLikedComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ProfileModule { }
