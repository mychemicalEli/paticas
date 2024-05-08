import { Component } from '@angular/core';
import { GetPaticasListItemResponse, GetPaticasListResponse } from '../models/get-paticas-list/get-paticas-list.response';
import { GetPaticasListRequest } from '../models/get-paticas-list/get-paticas-list.request';
import { PaticasService } from '../paticas-service/paticas.service';
import { Router } from '@angular/router';

@Component({
 
  selector: 'app-paticas-list',
  templateUrl: './paticas-list.component.html',
  styleUrl: './paticas-list.component.css'
})
export class PaticasListComponent {

  // Propiedades para almacenar la respuesta, solicitud y especies de paticas
  response?: GetPaticasListResponse;
  request: GetPaticasListRequest = { page: 0, pageSize: 12, shelterId:0 };
  species: Set<string> = new Set();
  // Propiedad para almacenar la patica seleccionada
  selectedPatica!: GetPaticasListItemResponse;

  // Constructor para inyectar dependencias
  constructor(private paticasService: PaticasService, private router: Router) { }

  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtener la lista de paticas al iniciar
    this.getPaticasList();
  }

  // Método privado para obtener la lista de paticas
  private getPaticasList() {
    // Llamada al servicio para obtener la lista de paticas
    this.paticasService.getList(this.request)
      .subscribe({
        // En caso de éxito, asignar la respuesta y actualizar la lista de especies
        next: (response: GetPaticasListResponse) => {
          this.response = response;
          this.updateSpeciesList(response.paticas);
        }
      });
  }

  // Método para actualizar la lista de especies de paticas
  private updateSpeciesList(paticas: any[]) {
    this.species.clear(); // Limpiar el conjunto de especies
    // Iterar sobre las paticas y agregar sus especies al conjunto
    paticas.forEach(patica => {
      this.species.add(patica.species);
    });
  }

  // Método para cambiar el estado de "like" de una patica
  toggleLike(patica: any) {
    patica.liked = !patica.liked; 
  }

  // Método para cambiar la página de la lista de paticas
  onPageChange(pageSize: number) {
    this.request.page = pageSize; // Actualizar el número de página en la solicitud
    this.getPaticasList(); // Volver a obtener la lista de paticas con la nueva página
  }

  // Método para navegar a los detalles de una patica seleccionada
  onSelectPatica(patica: GetPaticasListItemResponse): void {
    // Navegar a la página de detalles de la patica seleccionada
    this.router.navigate(['/paticas', patica.id]);
  }
}
