import { Component } from '@angular/core';
import { GetPaticasListItemResponse, GetPaticasListResponse } from '../models/get-paticas-list/get-paticas-list.response';
import { GetPaticasListRequest } from '../models/get-paticas-list/get-paticas-list.request';
import { PaticasService } from '../paticas-service/paticas.service';
import { Router } from '@angular/router';
import { UserService } from '../../auth/user-service/user.service';

@Component({

  selector: 'app-paticas-list',
  templateUrl: './paticas-list.component.html',
  styleUrl: './paticas-list.component.css'
})
export class PaticasListComponent {
  userRole: string = ''; // Rol del usuario
  response?: GetPaticasListResponse; // Respuesta del servicio para obtener la lista de paticas
  request: GetPaticasListRequest = { page: 0, pageSize: 12, shelterId: 0 }; // Solicitud para obtener la lista de paticas
  species: Set<string> = new Set(); // Conjunto para almacenar las especies de las paticas

  constructor(private paticasService: PaticasService, private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.userRole = this.userService.getRole(); // Obtiene el rol del usuario
    this.getPaticasList(); // Obtiene la lista de paticas
  }

  // Método privado para obtener la lista de paticas
  private getPaticasList() {
    this.paticasService.getList(this.request) // Llama al servicio para obtener la lista de paticas
      .pipe()
      .subscribe({
        next: (response: GetPaticasListResponse) => { // Maneja la respuesta exitosa
          this.response = response; // Almacena la respuesta
          this.updateSpeciesList(response.paticas); // Actualiza la lista de especies
        }
      });
  }

  // Método privado para actualizar la lista de especies
  private updateSpeciesList(paticas: any[]) {
    this.species.clear(); // Limpia el conjunto de especies
    paticas.forEach(patica => {
      this.species.add(patica.species); // Agrega la especie de cada patica al conjunto
    });
  }

  // Método para cambiar el estado de "Me gusta" de una patica
  toggleLike(patica: GetPaticasListItemResponse): void {
    patica.liked = !patica.liked; // Cambia el estado de "Me gusta"
    this.paticasService.updatePaticaLike(patica.id, patica.liked) // Llama al servicio para actualizar el estado de "Me gusta" de la patica
      .pipe()
      .subscribe({
        next: () => {
          console.log(`Patica ${patica.id} updated: liked = ${patica.liked}`); // Muestra un mensaje en la consola
        },
        error: (error) => {
          console.error(`Error updating like for Patica ${patica.id}:`, error); // Maneja los errores y muestra un mensaje en la consola
          patica.liked = !patica.liked; // Revierte el cambio de estado de "Me gusta"
        }
      });
  }

  // Método para cambiar de página en la lista de paticas
  onPageChange(pageSize: number) {
    this.request.page = pageSize; // Actualiza el número de página en la solicitud
    this.getPaticasList(); // Obtiene la lista de paticas para la página seleccionada
  }

}
