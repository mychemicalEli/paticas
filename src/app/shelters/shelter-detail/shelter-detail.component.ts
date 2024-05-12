import { Component, Input, OnInit } from '@angular/core';
import { GetShelterListItemResponse } from '../models/get-shelter-list/get-shelter-list.response';
import { ActivatedRoute, Router } from '@angular/router';
import { ShelterService } from '../shelters-service/shelter.service';
import { GetPaticasListItemResponse, GetPaticasListResponse } from '../../paticas/models/get-paticas-list/get-paticas-list.response';
import { GetPaticasListRequest } from '../../paticas/models/get-paticas-list/get-paticas-list.request';
import { PaticasService } from '../../paticas/paticas-service/paticas.service';

@Component({
  selector: 'app-shelter-detail',
  templateUrl: './shelter-detail.component.html',
  styleUrls: ['./shelter-detail.component.css']
})
export class ShelterDetailComponent implements OnInit {
  @Input() shelterId!: number;

  shelter!: GetShelterListItemResponse;
  paticas: GetPaticasListItemResponse[] = [];
  request: GetPaticasListRequest = { page: 0, pageSize: 9, shelterId: 0 }; // Inicializar shelterId en 0

  constructor(
    private route: ActivatedRoute,
    private shelterService: ShelterService,
    private paticasService: PaticasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.request.shelterId = +params['id']; // Obtener shelterId de los parámetros de la ruta
      this.getPaticasList();
      this.getShelterDetails(this.request.shelterId);
    });
  }

  private getShelterDetails(id: number): void {
    this.shelterService.getDetail(id)
    .pipe()
    .subscribe({
      next: (response: GetShelterListItemResponse) => {
        this.shelter = response;
      },
      error: (error) => {
        console.error('Error al cargar los detalles de la protectora:', error);
      }
    });
  }

  private getPaticasList(): void {
    this.paticasService.getListFilteredByShelter(this.request, this.request.shelterId)
    .pipe()
      .subscribe({
        next: (response: GetPaticasListResponse) => {
          // Filtrar las paticas con el shelterId proporcionado
          this.paticas = response.paticas.filter(patica => patica.shelterId === this.request.shelterId);
        },
        error: (error) => {
          console.error('Error al obtener la lista de paticas:', error);
        }
      });
  }

  toggleLike(patica: GetPaticasListItemResponse): void {
    patica.liked = !patica.liked;
    this.shelterService.updateShelterLike(patica.id, patica.liked)
    .pipe()
    .subscribe({
      next: () => {
        console.log(`Patica ${patica.id} updated: liked = ${patica.liked}`);
      },
      error: (error) => {
        console.error(`Error updating like for Shelter ${patica.id}:`, error);
        // Revert the change if update fails
        patica.liked = !patica.liked;
      }
    });
  }

  onPageChange(pageSize: number): void {
    this.request.page = pageSize; 
    this.getPaticasList();
  }

  onSelectPatica(patica: GetPaticasListItemResponse): void {
    this.router.navigate(['/paticas', patica.id]);
  }
}
