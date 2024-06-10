import { Component, Input } from '@angular/core';
import { GetShelterPaticasListResponse } from '../models/get-shelter-paticas-list/get-shelter-paticas-list.response';
import { GetShelterPaticasListRequest } from '../models/get-shelter-paticas-list/get-shelter-paticas-list.request';
import { ShelterPaticasService } from '../shelter-paticas-service/shelter-paticas.service';
import { Router } from '@angular/router';
import { PaticasListComponent } from '../../paticas/paticas-list/paticas-list.component';
import { UserService } from '../../auth/user-service/user.service';
import { GetPaticaByIdRequest } from '../../paticas/models/get-patica-by-id/get-patica-by-id.request';

@Component({
  selector: 'app-shelter-paticas-list',
  templateUrl: './shelter-paticas-list.component.html',
  styleUrls: ['./shelter-paticas-list.component.css']
})
export class ShelterPaticasListComponent {
  userRole: string = ''; // Variable para almacenar el rol del usuario actual
  response?: GetShelterPaticasListResponse; // Variable para almacenar la respuesta de la lista de "paticas"
  request: GetShelterPaticasListRequest = { page: 0, pageSize: 12}; // Objeto de solicitud para obtener la lista de "paticas"
  currentPaticaName: string = ''; // Nombre de la "patica" actual seleccionada
  currentPaticaId: number = 0; // ID de la "patica" actual seleccionada


  constructor(private userService: UserService, private shelterPaticasService: ShelterPaticasService, private router: Router) { }

  ngOnInit(): void {
    this.userRole = this.userService.getRole(); // Obtiene el rol del usuario actual
    this.getShelterPaticasList(); // Obtiene la lista de "paticas" del refugio
  }


  // Llama al servicio para obtener la lista de "paticas" del refugio
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

  onPageChange(page: number) {
    // Actualiza el número de página en la solicitud y vuelve a obtener la lista de "paticas"
    this.request.page = page;
  }

  // Método para manejar el clic en el botón de eliminar una "patica"
  onDeleteClick(paticaName: string, paticaId: number) {
    // Establece el nombre y el ID de la "patica" actual a eliminar
    this.currentPaticaName = paticaName;
    this.currentPaticaId = paticaId;
  }


  // Método para eliminar una "patica"
  deletePatica(paticaId: number) {
    // Crea la solicitud para eliminar la "patica" y llama al servicio correspondiente
    const request: GetPaticaByIdRequest = { id: paticaId };
    this.shelterPaticasService.deletePatica(request)
      .pipe()
      .subscribe({
        next: () => {
          console.log('Patica eliminada exitosamente');
          const closeButton = document.getElementById('x');
          closeButton?.click();
          this.request.page = 0; 
          this.getShelterPaticasList();
        },
        error: (error) => {
          console.error('Error al eliminar patica:', error);
        }
      });
  }
  // Navega a la página de detalles de la "patica" seleccionada
  onSelectPatica(patica: any): void {
    this.router.navigate(['/paticas', patica.id]);
  }

}
