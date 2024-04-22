import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelterListComponent } from './shelter-list/shelter-list.component';
import { SheltersComponent } from './shelters.component';

const routes: Routes = [
  { path: '', component: ShelterListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SheltersRoutingModule { }
