import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaticasComponent } from './paticas.component';
import { PaticasListComponent } from './paticas-list/paticas-list.component';
import { PaticaDetailComponent } from './patica-detail/patica-detail.component';
import { AdoptionFormComponent } from '../formularios/adoption-form/adoption-form.component';



const routes: Routes = [
  { path: ':id', component: PaticaDetailComponent },
  { path: 'formularios/adoption', component: AdoptionFormComponent },
  { path: '', component: PaticasListComponent }, 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaticasRoutingModule { }
