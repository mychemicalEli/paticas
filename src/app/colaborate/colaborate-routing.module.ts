import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaborateComponent } from './colaborate.component';

const routes: Routes = [{ path: '', component: ColaborateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaborateRoutingModule { }
