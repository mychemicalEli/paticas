import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaborateRoutingModule } from './colaborate-routing.module';
import { ColaborateComponent } from './colaborate.component';
import { ColaborateContentComponent } from './colaborate-content/colaborate-content.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    ColaborateComponent,
    ColaborateContentComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    ColaborateRoutingModule
  ]
})
export class ColaborateModule { }
