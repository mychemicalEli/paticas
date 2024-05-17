import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelterListComponent } from './shelter-list/shelter-list.component';
import { ShelterDetailComponent } from './shelter-detail/shelter-detail.component';
import { VolunteerFormComponent } from '../formularios/volunteer-form/volunteer-form.component';

const routes: Routes = [
  { path: '', component: ShelterListComponent },
  { path: ':id', component: ShelterDetailComponent },
  { path: 'formularios/volunteer', component: VolunteerFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SheltersRoutingModule { }
