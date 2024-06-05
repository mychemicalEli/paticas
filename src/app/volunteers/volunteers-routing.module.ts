import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolunteersComponent } from './volunteers.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { CreateVolunteerComponent } from './create-volunteer/create-volunteer.component';
import { UpdateVolunteerComponent } from './update-volunteer/update-volunteer.component';

const routes: Routes = [{ path: '', component: VolunteersListComponent },
{ path: 'create', component: CreateVolunteerComponent },
{ path: ':id/edit', component: UpdateVolunteerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolunteersRoutingModule { }
