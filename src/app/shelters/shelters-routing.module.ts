import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelterListComponent } from './shelter-list/shelter-list.component';
import { ShelterDetailComponent } from './shelter-detail/shelter-detail.component';

const routes: Routes = [
  { path: '', component: ShelterListComponent },
  { path: ':id', component: ShelterDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SheltersRoutingModule { }
