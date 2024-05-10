import { Component } from '@angular/core';
import { GetShelterListItemResponse, GetShelterListResponse } from '../models/get-shelter-list/get-shelter-list.response'; // Importa la interfaz de respuesta para la lista de refugios
import { GetShelterListRequest } from '../models/get-shelter-list/get-shelter-list.request'; // Importa la interfaz de solicitud para la lista de refugios
import { ShelterService } from '../shelters-service/shelter.service'; // Importa el servicio de refugios

@Component({
  selector: 'app-shelter-list', 
  templateUrl: './shelter-list.component.html', 
  styleUrls: ['./shelter-list.component.css'] 
})
export class ShelterListComponent {

  response?: GetShelterListResponse; // Variable para almacenar la respuesta de la solicitud de lista de refugios
  request: GetShelterListRequest = { page: 0, pageSize: 12 }; // Objeto de solicitud de lista de refugios con valores predeterminados
  locations: Set<string> = new Set(); // Conjunto para almacenar ubicaciones únicas de refugios

  constructor(private shelterService: ShelterService) { } // Constructor que inyecta el servicio de refugios

  ngOnInit(): void {
    this.getShelterList(); // Al inicializarse el componente, se llama a la función para obtener la lista de refugios
  }

  // Función para obtener la lista de refugios
  private getShelterList() {
    this.shelterService.get(this.request) // Llama al método get del servicio de refugios con la solicitud actual
      .subscribe({
        next: (response: GetShelterListResponse) => { // Maneja la respuesta exitosa
          this.response = response; // Asigna la respuesta a la variable response
          this.updateLocationsList(response.shelters); // Actualiza la lista de ubicaciones de refugios
        }
      });
  }

  // Función para actualizar la lista de ubicaciones de refugios
  private updateLocationsList(shelters: any[]) {
    this.locations.clear(); // Limpia el conjunto de ubicaciones
    shelters.forEach(shelter => { // Itera sobre cada refugio en la lista
      this.locations.add(shelter.location); // Agrega la ubicación del refugio al conjunto
    });
  }

  // Función para alternar el estado de "me gusta" de un refugio
  toggleLike(shelter: GetShelterListItemResponse): void {
    shelter.liked = !shelter.liked;
    this.shelterService.updateShelterLike(shelter.id, shelter.liked).subscribe({
      next: () => {
        console.log(`Shelter ${shelter.id} updated: liked = ${shelter.liked}`);
      },
      error: (error) => {
        console.error(`Error updating like for Shelter ${shelter.id}:`, error);
        // Revert the change if update fails
        shelter.liked = !shelter.liked;
      }
    });
  }

  // Función para manejar el cambio de página
  onPageChange(pageSize: number) {
    this.request.page = pageSize; // Actualiza el número de página en la solicitud
    this.getShelterList(); // Obtiene la lista de refugios con la nueva página
  }
}
