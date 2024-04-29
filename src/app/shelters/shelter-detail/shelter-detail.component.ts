import { Component, Input, OnInit } from '@angular/core';
import { GetShelterListItemResponse } from '../models/get-shelter-list/get-shelter-list.response';
import { ActivatedRoute } from '@angular/router';
import { ShelterService } from '../shelters-service/shelter.service';

@Component({
  selector: 'app-shelter-detail',
  templateUrl: './shelter-detail.component.html',
  styleUrl: './shelter-detail.component.css'
})
export class ShelterDetailComponent implements OnInit {
  @Input() shelterId!: number;

  shelter!: GetShelterListItemResponse;

  constructor(private route: ActivatedRoute, private shelterService: ShelterService) {}
  ngOnInit() {
    // Obtener el ID de la patica de la ruta si no se proporciona directamente
    if (!this.shelterId) {
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.getShelterDetails(id);
      });
    } else {
      // Si se proporciona el ID directamente, cargar los detalles de la protectora
      this.getShelterDetails(this.shelterId);
    }
  }

  // Método para cargar los detalles de la protectora
  private getShelterDetails(id: number) {
    // Llamada al servicio para obtener los detalles de la protectora con el ID proporcionado
    this.shelterService.getDetail(id).subscribe({
      // En caso de éxito, asignar la respuesta a la propiedad shelter
      next: (response: GetShelterListItemResponse) => {
        this.shelter = response;
      },
      // En caso de error, mostrar un mensaje de error en la consola
      error: (error) => {
        console.error('Error al cargar los detalles de la protectora:', error);
      }
    });
  }
}

