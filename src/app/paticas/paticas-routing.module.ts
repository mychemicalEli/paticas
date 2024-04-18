import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaticasComponent } from './paticas.component';

const routes: Routes = [{ path: '', component: PaticasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaticasRoutingModule { }
