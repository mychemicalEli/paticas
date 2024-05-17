import { Component, Input } from '@angular/core';
import { GetShelterPaticasListResponse } from '../models/get-shelter-paticas-list/get-shelter-paticas-list.response';
import { GetShelterPaticasListRequest } from '../models/get-shelter-paticas-list/get-shelter-paticas-list.request';
import { ShelterPaticasService } from '../shelter-paticas-service/shelter-paticas.service';
import { Router } from '@angular/router';
import { PaticasListComponent } from '../../paticas/paticas-list/paticas-list.component';
import { UserService } from '../../auth/user-service/user.service';

@Component({
  selector: 'app-shelter-paticas-list',
  templateUrl: './shelter-paticas-list.component.html',
  styleUrls: ['./shelter-paticas-list.component.css']
})
export class ShelterPaticasListComponent {
  userRole: string ='';
  response?: GetShelterPaticasListResponse;
  request: GetShelterPaticasListRequest = { page: 0, pageSize: 12, shelterId: 10 };
  currentPaticaName: string = '';
  currentPaticaId: number = 0;
  
  constructor(private userService: UserService, private shelterPaticasService: ShelterPaticasService, private router: Router) { }

  ngOnInit(): void {
    this.userRole = this.userService.getRole();
    this.getShelterPaticasList();
  }

  private getShelterPaticasList() {
    this.shelterPaticasService.getList(this.request)
    .pipe()
      .subscribe({
        next: (response: GetShelterPaticasListResponse) => {
          this.response = response;
          console.log(this.response)
        }
      });
  }

  onPageChange(pageSize: number) {
    this.request.page = pageSize;
    this.getShelterPaticasList();
  }

  onDeleteClick(paticaName: string, paticaId: number) {
    this.currentPaticaName = paticaName;
    this.currentPaticaId = paticaId;
  }


  deletePatica(paticaId: number) {
    this.shelterPaticasService.deletePatica(paticaId)
    .pipe()
    .subscribe({
      next: () => {
        console.log('Patica eliminada exitosamente');
        const closeButton = document.getElementById('x');
        closeButton?.click();
        this.getShelterPaticasList();
      },
      error: (error) => {
        console.error('Error al eliminar patica:', error);
      }
    });
  }

  onSelectPatica(patica: any): void {
    this.router.navigate(['/paticas', patica.id]);
}

}
