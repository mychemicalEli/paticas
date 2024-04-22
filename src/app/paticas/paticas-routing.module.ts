import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaticasComponent } from './paticas.component';
import { PaticasListComponent } from './paticas-list/paticas-list.component';

const routes: Routes = [{ path: '', component: PaticasListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaticasRoutingModule { }
