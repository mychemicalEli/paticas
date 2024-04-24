import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaticasComponent } from './paticas.component';
import { PaticasListComponent } from './paticas-list/paticas-list.component';
import { PaticaDetailComponent } from './patica-detail/patica-detail.component';

const routes: Routes = [
  { path: '', component: PaticasListComponent },
  { path: ':id', component: PaticaDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaticasRoutingModule { }
