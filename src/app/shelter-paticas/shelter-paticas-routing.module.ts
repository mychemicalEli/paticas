import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelterPaticasComponent } from './shelter-paticas.component';
import { ShelterPaticasListComponent } from './shelter-paticas-list/shelter-paticas-list.component';

const routes: Routes = [{ path: '', component: ShelterPaticasListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelterPaticasRoutingModule { }
