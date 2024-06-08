// Importar los módulos y servicios necesarios de Angular y otros paquetes
import { Component, Input, OnInit } from '@angular/core';
import { GetShelterListItemResponse } from '../models/get-shelter-list/get-shelter-list.response';
import { ActivatedRoute, Router } from '@angular/router';
import { ShelterService } from '../shelters-service/shelter.service';
import { GetPaticasListItemResponse, GetPaticasListResponse } from '../../paticas/models/get-paticas-list/get-paticas-list.response';
import { GetPaticasListRequest } from '../../paticas/models/get-paticas-list/get-paticas-list.request';
import { PaticasService } from '../../paticas/paticas-service/paticas.service';
import { UserService } from '../../auth/user-service/user.service';
import { GetShelterByIdResponse } from '../models/get-shelter-detail/get-shelter-detail.response';

@Component({
  selector: 'app-shelter-detail', // Selector utilizado en el template HTML para este componente
  templateUrl: './shelter-detail.component.html',
  styleUrls: ['./shelter-detail.component.css'] // Estilos específicos para este componente
})
export class ShelterDetailComponent implements OnInit {
  @Input() shelterId!: number; // Propiedad de entrada para recibir el ID del refugio desde un componente padre

  userRole: string = ''; // Variable para almacenar el rol del usuario
  shelter?: GetShelterByIdResponse; // Variable para almacenar los detalles del refugio
  paticas: GetPaticasListItemResponse[] = []; // Lista para almacenar las paticas del refugio
  request: GetPaticasListRequest = { page: 0, pageSize: 9, shelterId: 0 }; // Inicializar la solicitud con valores predeterminados

  constructor(
    private route: ActivatedRoute, // Servicio para acceder a la información de la ruta activa
    private shelterService: ShelterService, // Servicio para manejar las operaciones de los refugios
    private paticasService: PaticasService, // Servicio para manejar las operaciones de las paticas
    private router: Router, // Servicio para la navegación del router
    private userService: UserService // Servicio para manejar la información del usuario
  ) {}

  // Método de ciclo de vida de Angular que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtener el rol del usuario
    this.userRole = this.userService.getRole();
    
    // Suscribirse a los cambios en los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.request.shelterId = +params['id']; // Obtener shelterId de los parámetros de la ruta
      this.getPaticasList(); // Obtener la lista de paticas
      this.getShelterDetails(this.request.shelterId); // Obtener los detalles del refugio
    });
  }

  // Método privado para obtener los detalles del refugio por ID
  private getShelterDetails(id: number): void {
    this.shelterService.getDetail({ id: id })
    .pipe()
    .subscribe({
      next: (response: GetShelterByIdResponse) => {
        this.shelter = response; // Asignar la respuesta a la variable shelter
      },
      error: (error) => {
        console.error('Error al cargar los detalles de la protectora:', error); // Manejar el error
      }
    });
  }

  // Método privado para obtener la lista de paticas filtradas por el ID del refugio
  private getPaticasList(): void {
    this.paticasService.getListFilteredByShelter(this.request, this.request.shelterId)
    .pipe()
    .subscribe({
      next: (response: GetPaticasListResponse) => {
        // Filtrar las paticas con el shelterId proporcionado
        this.paticas = response.content.filter(patica => patica.shelterId === 10);
      },
      error: (error) => {
        console.error('Error al obtener la lista de paticas:', error); // Manejar el error
      }
    });
  }

  // Método para alternar el estado de "me gusta" de una patica
  toggleLike(patica: GetPaticasListItemResponse): void {
    patica.liked = !patica.liked; // Alternar el estado de "me gusta"
    this.shelterService.updateShelterLike(patica.id, patica.liked)
    .pipe()
    .subscribe({
      next: () => {
        console.log(`Patica ${patica.id} updated: liked = ${patica.liked}`); // Confirmar la actualización
      },
      error: (error) => {
        console.error(`Error updating like for Shelter ${patica.id}:`, error); // Manejar el error
        patica.liked = !patica.liked; // Revertir el cambio si la actualización falla
      }
    });
  }

  // Método para manejar el cambio de página
  onPageChange(page: number) {
    // Actualiza el número de página en la solicitud y vuelve a obtener la lista de "paticas"
    this.request.page = page;
  }

  // Método para manejar la selección de una patica
  onSelectPatica(patica: GetPaticasListItemResponse): void {
    this.router.navigate(['/paticas', patica.id]); // Navegar a la página de detalles de la patica seleccionada
  }
}
