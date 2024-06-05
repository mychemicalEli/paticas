import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileShelterComponent } from './profile-shelter/profile-shelter.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'shelter', component: ProfileShelterComponent },
  { path: 'user', component: ProfileUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
