import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaborateContentComponent } from './colaborate-content/colaborate-content.component';
import { ColaborateComponent } from './colaborate.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: '', component: ColaborateComponent },
  { path: 'payment', component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaborateRoutingModule { }
