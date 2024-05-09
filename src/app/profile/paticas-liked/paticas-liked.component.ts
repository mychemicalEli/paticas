import { Component, OnInit } from '@angular/core';
import { GetUserPaticasLikedItemResponse, GetUserPaticasLikedResponse } from '../models/get-user-profile/get-user-paticas-liked.response';
import { GetUserProfileRequest } from '../models/get-user-profile/get-user-profile-paticas.request';
import { ProfileService } from '../profile-service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paticas-liked',
  templateUrl: './paticas-liked.component.html',
  styleUrl: './paticas-liked.component.css'
})
export class PaticasLikedComponent implements OnInit {
  paticas?: GetUserPaticasLikedItemResponse[] = [];
  request: GetUserProfileRequest = { page: 0, pageSize: 12, isLiked: false };

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.getPaticasLikedList();
  }

  private getPaticasLikedList() {
    this.profileService.getLikedPaticas(this.request)
      .subscribe({
        next: (response: GetUserPaticasLikedResponse) => {
          this.paticas = response.paticas;
        }
      });
  }

  onPageChange(pageSize: number): void {
    this.request.page = pageSize;
    this.getPaticasLikedList();
  }

  toggleLike(patica: GetUserPaticasLikedItemResponse): void {
    patica.liked = !patica.liked;
    this.profileService.updatePaticaLike(patica.id, patica.liked).subscribe({
      next: () => {
        console.log(`Patica ${patica.id} updated: liked = ${patica.liked}`);
        // Actualizar la lista de paticas después de cambiar el estado de "liked"
        this.getPaticasLikedList();
      },
      error: (error) => {
        console.error(`Error updating like for Patica ${patica.id}:`, error);
        // Revert the change if update fails
        patica.liked = !patica.liked;
      }
    });
  }

  onSelectPatica(patica: GetUserPaticasLikedItemResponse): void {
    this.router.navigate(['/paticas', patica.id]);
  }

}
