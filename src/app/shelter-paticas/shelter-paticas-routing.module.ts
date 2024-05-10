import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelterPaticasComponent } from './shelter-paticas.component';
import { ShelterPaticasListComponent } from './shelter-paticas-list/shelter-paticas-list.component';
import { AddPaticaComponent } from './add-patica/add-patica.component';

const routes: Routes = [{ path: '', component: ShelterPaticasListComponent },
{ path: 'add', component: AddPaticaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelterPaticasRoutingModule { }
