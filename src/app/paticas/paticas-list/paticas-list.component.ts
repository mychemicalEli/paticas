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

  response?: GetPaticasListResponse;
  request: GetPaticasListRequest = { page: 0, pageSize: 12 };
  species: Set<string> = new Set();
  selectedPatica!: GetPaticasListItemResponse;


  constructor(private paticasService: PaticasService, private router: Router) { }

  ngOnInit(): void {
    this.getPaticasList();
  }

  private getPaticasList() {
    this.paticasService.getList(this.request)
      .pipe()
      .subscribe({
        next: (response: GetPaticasListResponse) => {
          this.response = response;
          this.updateSpeciesList(response.paticas);
  }
});
}

private updateSpeciesList(paticas: any[]) {
  this.species.clear(); 
  paticas.forEach(patica => {
    this.species.add(patica.species);
  });
}

toggleLike(paticas: any) {
  paticas.liked = !paticas.liked;
}
onPageChange(pageSize: number) {
  this.request.page = pageSize;
  this.getPaticasList();
}
onSelectPatica(patica: GetPaticasListItemResponse): void {
  this.router.navigate(['/paticas', patica.id]);

}

}
