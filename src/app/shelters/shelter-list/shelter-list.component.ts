import { Component } from '@angular/core';
import { GetShelterListResponse } from '../dto/get-shelter-list/get-shelter-list.response';
import { GetShelterListRequest } from '../dto/get-shelter-list/get-shelter-list.request';
import { ShelterService } from '../shelters-service/shelter.service';


@Component({
  selector: 'app-shelter-list',
  templateUrl: './shelter-list.component.html',
  styleUrls: ['./shelter-list.component.css']
})
export class ShelterListComponent {

  response?: GetShelterListResponse;
  request: GetShelterListRequest = { page: 0, pageSize: 9 }
  locations: string[] = []; 

  constructor(private shelterService: ShelterService) {}

  ngOnInit(): void {
    this.getShelterList();
  }

  private getShelterList() {
    this.shelterService.get(this.request)
      .subscribe({
        next: (response: GetShelterListResponse) => {
          this.response = response;
          this.locations = response.shelters.map(shelter => shelter.location);
        }
      });
  }

  toggleLike(shelter: any) {
    shelter.liked = !shelter.liked;
  }  
}
