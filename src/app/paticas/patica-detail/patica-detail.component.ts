import { Component, Input, OnInit } from '@angular/core';
import { GetPaticasListItemResponse } from '../models/get-paticas-list/get-paticas-list.response';
import { paticaSize } from '../models/paticas-size.enum';
import { ActivatedRoute } from '@angular/router';
import { PaticasService } from '../paticas-service/paticas.service';

@Component({
  selector: 'app-patica-detail',
  templateUrl: './patica-detail.component.html',
  styleUrls: ['./patica-detail.component.css']
})
export class PaticaDetailComponent implements OnInit {
  // @Input() para recibir el ID de la patica desde otro componente
  @Input() paticaId!: number;
  
  // Almacenar detalles de la patica
  @Input () patica!: GetPaticasListItemResponse;

  // Enumeración para el tamaño de la patica
  paticaSizeEnum = paticaSize;
  
  // Constructor para inyectar dependencias
  constructor(private route: ActivatedRoute, private paticasService: PaticasService) {}
  
  // Se ejecuta al inicializar el componente
  ngOnInit() {
    // Obtener el ID de la patica de la ruta si no se proporciona directamente
    if (!this.paticaId) {
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.getPaticaDetails(id);
      });
    } else {
      // Si se proporciona el ID directamente, cargar los detalles de la patica
      this.getPaticaDetails(this.paticaId);
    }
  }

  // Método para cargar los detalles de la patica
  private getPaticaDetails(id: number) {
    // Llamada al servicio para obtener los detalles de la patica con el ID proporcionado
    this.paticasService.getDetail(id).subscribe({
      // En caso de éxito, asignar la respuesta a la propiedad patica
      next: (response: GetPaticasListItemResponse) => {
        this.patica = response;
      },
      // En caso de error, mostrar un mensaje de error en la consola
      error: (error) => {
        console.error('Error al cargar los detalles de la patica:', error);
      }
    });
  }
}
