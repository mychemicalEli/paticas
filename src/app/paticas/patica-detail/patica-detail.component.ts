// Importaciones de módulos y clases necesarias desde Angular
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
  // Decorador @Input() para recibir el ID de la patica desde otro componente
  @Input() paticaId!: number;
  
  // Propiedad para almacenar los detalles de la patica
  patica!: GetPaticasListItemResponse;

  // Enumeración para el tamaño de la patica
  paticaSizeEnum = paticaSize;
  
  // Constructor para inyectar dependencias
  constructor(private route: ActivatedRoute, private paticasService: PaticasService) {}
  
  // Método ngOnInit, que se ejecuta al inicializar el componente
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
    this.paticasService.getDetail(id).subscribe(
      (response: GetPaticasListItemResponse) => {
        this.patica = response;
      },
      (error) => {
        console.error('Error al cargar los detalles de la patica:', error);
      }
    );
  }
}
