// Importar los módulos y servicios necesarios de Angular y otros paquetes
import { Component } from '@angular/core';
import { GetShelterListItemResponse, GetShelterListResponse } from '../models/get-shelter-list/get-shelter-list.response'; // Importa la interfaz de respuesta para la lista de refugios
import { GetShelterListRequest } from '../models/get-shelter-list/get-shelter-list.request'; // Importa la interfaz de solicitud para la lista de refugios
import { ShelterService } from '../shelters-service/shelter.service'; // Importa el servicio de refugios
import { UserService } from '../../auth/user-service/user.service'; // Importa el servicio de usuario

@Component({
  selector: 'app-shelter-list', // Selector utilizado en el template HTML para este componente
  templateUrl: './shelter-list.component.html', // Ruta al archivo de template HTML
  styleUrls: ['./shelter-list.component.css'] // Ruta al archivo de estilos CSS
})
export class ShelterListComponent {

  userRole: string = ''; // Variable para almacenar el rol del usuario
  response?: GetShelterListResponse; // Variable para almacenar la respuesta de la solicitud de lista de refugios
  request: GetShelterListRequest = { page: 0, pageSize: 12 }; // Objeto de solicitud de lista de refugios con valores predeterminados
  locations: Set<string> = new Set(); // Conjunto para almacenar ubicaciones únicas de refugios

  // Constructor que inyecta el servicio de refugios y el servicio de usuario
  constructor(private shelterService: ShelterService, private userService: UserService) { }

  // Método de ciclo de vida de Angular que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.userRole = this.userService.getRole(); // Obtener el rol del usuario
    this.getShelterList(); // Al inicializarse el componente, se llama a la función para obtener la lista de refugios
  }

  // Función para obtener la lista de refugios
  private getShelterList(): void {
    this.shelterService.get(this.request) // Realiza la solicitud para obtener la lista de refugios
    .pipe() // Permite encadenar operadores de RxJS
    .subscribe({
      next: (response: GetShelterListResponse) => { // Maneja la respuesta exitosa
        this.response = response; // Asigna la respuesta a la variable response
        this.updateLocationsList(response.shelters); // Actualiza la lista de ubicaciones de refugios
      },
      error: (error) => {
        console.error('Error al obtener la lista de refugios:', error); // Maneja el error
      }
    });
  }

  // Función para actualizar la lista de ubicaciones de refugios
  private updateLocationsList(shelters: GetShelterListItemResponse[]): void {
    this.locations.clear(); // Limpia el conjunto de ubicaciones
    shelters.forEach(shelter => { // Itera sobre cada refugio en la lista
      this.locations.add(shelter.location); // Agrega la ubicación del refugio al conjunto
    });
  }

  // Función para alternar el estado de "me gusta" de un refugio
  toggleLike(shelter: GetShelterListItemResponse): void {
    shelter.liked = !shelter.liked; // Alterna el estado de "me gusta"
    this.shelterService.updateShelterLike(shelter.id, shelter.liked) // Realiza la solicitud para actualizar el estado de "me gusta"
    .pipe()
    .subscribe({
      next: () => {
        console.log(`Shelter ${shelter.id} updated: liked = ${shelter.liked}`); // Confirmar la actualización
      },
      error: (error) => {
        console.error(`Error updating like for Shelter ${shelter.id}:`, error); // Maneja el error
        shelter.liked = !shelter.liked; // Revertir el cambio si la actualización falla
      }
    });
  }

  // Función para manejar el cambio de página
  onPageChange(pageSize: number): void {
    this.request.page = pageSize; // Actualiza el número de página en la solicitud
    this.getShelterList(); // Obtiene la lista de refugios con la nueva configuración
  }
}
