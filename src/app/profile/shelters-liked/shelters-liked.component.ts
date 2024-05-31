import { Component, OnInit } from '@angular/core';
import { GetUserSheltersLikedItemResponse, GetUserSheltersLikedResponse } from '../models/get-user-profile/get-user-shelters-liked.response';
import { GetUserProfileRequest } from '../models/get-user-profile/get-user-profile-paticas.request';
import { ProfileService } from '../profile-service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shelters-liked',
  templateUrl: './shelters-liked.component.html',
  styleUrl: './shelters-liked.component.css' // Se debería corregir a styleUrls
})
export class SheltersLikedComponent implements OnInit {
  shelters?: GetUserSheltersLikedItemResponse[] = []; // Lista de refugios que le gustan al usuario
  request: GetUserProfileRequest = { page: 0, pageSize: 12, isLiked: false }; // Objeto de solicitud para obtener la lista de refugios que le gustan al usuario

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    // Al inicializar el componente, se obtiene la lista de refugios que le gustan al usuario
    this.getSheltersLikedList();
  }

  private getSheltersLikedList() {
    // Método para obtener la lista de refugios que le gustan al usuario
    this.profileService.getLikedShelters(this.request)
      .pipe()
      .subscribe({
        next: (response: GetUserSheltersLikedResponse) => {
          // Al recibir la respuesta, se asignan los refugios a la variable shelters
          this.shelters = response.shelters;
        }
      });
  }

  onPageChange(pageSize: number): void {
    // Método para cambiar la página de la lista de refugios
    this.request.page = pageSize;
    this.getSheltersLikedList(); // Se vuelve a obtener la lista de refugios
  }

  toggleLike(shelter: GetUserSheltersLikedItemResponse): void {
    // Método para cambiar el estado de "me gusta" de un refugio
    shelter.liked = !shelter.liked; // Se invierte el estado de "me gusta"
    this.profileService.updateShelterLike(shelter.id, shelter.liked)
      .pipe()
      .subscribe({
        next: () => {
          // Si la actualización es exitosa, se muestra un mensaje y se actualiza la lista de refugios
          console.log(`Shelter ${shelter.id} updated: liked = ${shelter.liked}`);
          this.getSheltersLikedList();
        },
        error: (error) => {
          // Si hay un error en la actualización, se muestra un mensaje de error y se revierte el cambio
          console.error(`Error updating like for Shelter ${shelter.id}:`, error);
          shelter.liked = !shelter.liked; // Se revierte el cambio de estado
        }
      });
  }
}
