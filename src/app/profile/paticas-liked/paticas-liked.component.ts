import { Component, OnInit } from '@angular/core';
import { GetUserPaticasLikedItemResponse, GetUserPaticasLikedResponse } from '../models/get-user-profile/get-user-paticas-liked.response';
import { GetUserProfileRequest } from '../models/get-user-profile/get-user-profile-paticas.request';
import { ProfileService } from '../profile-service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paticas-liked',
  templateUrl: './paticas-liked.component.html',
  styleUrls: ['./paticas-liked.component.css']
})
export class PaticasLikedComponent implements OnInit {
  paticas?: GetUserPaticasLikedItemResponse[] = []; // Lista de paticas que le gustan al usuario
  request: GetUserProfileRequest = { page: 0, pageSize: 12, isLiked: false }; // Objeto de solicitud para obtener paticas que le gustan al usuario

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.getPaticasLikedList(); // Obtener la lista de paticas que le gustan al usuario cuando se inicializa el componente
  }

  // Método para obtener la lista de paticas que le gustan al usuario
  private getPaticasLikedList() {
    this.profileService.getLikedPaticas(this.request)
    .pipe()
    .subscribe({
      next: (response: GetUserPaticasLikedResponse) => {
        this.paticas = response.paticas; // Asignar la lista de paticas que le gustan al usuario
      }
    });
  }

  // Método para cambiar de página en la lista de paticas que le gustan al usuario
  onPageChange(pageSize: number): void {
    this.request.page = pageSize; // Actualizar el número de página en la solicitud
    this.getPaticasLikedList(); // Obtener la lista de paticas actualizada
  }

  // Método para cambiar el estado de "me gusta" de una patica
  toggleLike(patica: GetUserPaticasLikedItemResponse): void {
    patica.liked = !patica.liked; // Cambiar el estado de "me gusta"
    this.profileService.updatePaticaLike(patica.id, patica.liked)
    .pipe()
    .subscribe({
      next: () => {
        console.log(`Patica ${patica.id} updated: liked = ${patica.liked}`);
        // Actualizar la lista de paticas después de cambiar el estado de "me gusta"
        this.getPaticasLikedList();
      },
      error: (error) => {
        console.error(`Error updating like for Patica ${patica.id}:`, error);
        // Revertir el cambio si la actualización falla
        patica.liked = !patica.liked;
      }
    });
  }

  // Método para navegar a la página de detalles de una patica cuando se selecciona
  onSelectPatica(patica: GetUserPaticasLikedItemResponse): void {
    this.router.navigate(['/paticas', patica.id]); // Navegar a la página de detalles de la patica seleccionada
  }
}
