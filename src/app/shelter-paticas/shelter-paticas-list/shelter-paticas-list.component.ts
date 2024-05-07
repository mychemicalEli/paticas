import { Component, Input } from '@angular/core';
import { GetShelterPaticasListResponse } from '../models/get-shelter-paticas-list/get-shelter-paticas-list.response';
import { GetShelterPaticasListRequest } from '../models/get-shelter-paticas-list/get-shelter-paticas-list.request';
import { ShelterPaticasService } from '../shelter-paticas-service/shelter-paticas.service';
import { Router } from '@angular/router';
import { PaticasListComponent } from '../../paticas/paticas-list/paticas-list.component';

@Component({
  selector: 'app-shelter-paticas-list',
  templateUrl: './shelter-paticas-list.component.html',
  styleUrls: ['./shelter-paticas-list.component.css']
})
export class ShelterPaticasListComponent {
  isShelterAdmin =true;
  response?: GetShelterPaticasListResponse;
  request: GetShelterPaticasListRequest = { page: 0, pageSize: 12, shelterId: 10 };
  
  constructor(private shelterPaticasService: ShelterPaticasService, private router: Router) { }

  ngOnInit(): void {
    this.getShelterPaticasList();
  }

  private getShelterPaticasList() {
    this.shelterPaticasService.getList(this.request)
      .subscribe({
        next: (response: GetShelterPaticasListResponse) => {
          this.response = response;
          console.log(this.response)
        }
      });
  }

  onPageChange(pageSize: number) {
    this.request.page = pageSize;
    this.getShelterPaticasList();
  }

  onSelectPatica(patica: any): void {
    this.router.navigate(['/paticas', patica.id], { state: { isShelterAdmin: this.isShelterAdmin } });
}

}
