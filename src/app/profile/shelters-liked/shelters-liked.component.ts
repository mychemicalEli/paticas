import { Component, OnInit } from '@angular/core';
import { GetUserSheltersLikedItemResponse, GetUserSheltersLikedResponse } from '../models/get-user-profile/get-user-shelters-liked.response';
import { GetUserProfileRequest } from '../models/get-user-profile/get-user-profile-paticas.request';
import { ProfileService } from '../profile-service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shelters-liked',
  templateUrl: './shelters-liked.component.html',
  styleUrl: './shelters-liked.component.css'
})
export class SheltersLikedComponent implements OnInit {
  shelters?: GetUserSheltersLikedItemResponse[] = [];
  request: GetUserProfileRequest = { page: 0, pageSize: 12, isLiked: false };

  constructor(private profileService: ProfileService, private router: Router) { }
  ngOnInit(): void {
    this.getSheltersLikedList();
  }

  private getSheltersLikedList() {
    this.profileService.getLikedShelters(this.request)
      .subscribe({
        next: (response: GetUserSheltersLikedResponse) => {
          this.shelters = response.shelters;
        }
      });
  }

  onPageChange(pageSize: number): void {
    this.request.page = pageSize;
    this.getSheltersLikedList();
  }

  toggleLike(shelter: GetUserSheltersLikedItemResponse): void {
    shelter.liked = !shelter.liked;
    this.profileService.updateShelterLike(shelter.id, shelter.liked).subscribe({
      next: () => {
        console.log(`Shelter ${shelter.id} updated: liked = ${shelter.liked}`);
        // Actualizar la lista de shelter después de cambiar el estado de "liked"
        this.getSheltersLikedList();
      },
      error: (error) => {
        console.error(`Error updating like for Shelter ${shelter.id}:`, error);
        // Revert the change if update fails
        shelter.liked = !shelter.liked;
      }
    });
  }
}
