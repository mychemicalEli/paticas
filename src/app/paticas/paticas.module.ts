import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaticasRoutingModule } from './paticas-routing.module';
import { PaticasComponent } from './paticas.component';
import { PaticasListComponent } from './paticas-list/paticas-list.component';
import { PaticaDetailComponent } from './patica-detail/patica-detail.component';

@NgModule({
  declarations: [
    PaticasComponent,
    PaticasListComponent,
    PaticaDetailComponent,
    
  ],
  imports: [
    CommonModule,
    PaticasRoutingModule,
    NgxPaginationModule,

  ],
  exports: [
    PaticasListComponent,
    // Otros componentes que quieras exportar
  ]
})
export class PaticasModule { }
