import { Component, Input, OnInit } from '@angular/core';
import { GetPaticasListItemResponse } from '../models/get-paticas-list/get-paticas-list.response';
import { paticaSize } from '../models/paticas-size.enum';
import { ActivatedRoute } from '@angular/router';
import { PaticasService } from '../paticas-service/paticas.service';
import { UserService } from '../../auth/user-service/user.service';
import { GetPaticaByIdResponse } from '../models/get-patica-by-id/get-patica-by-id.response';

@Component({
  selector: 'app-patica-detail',
  templateUrl: './patica-detail.component.html',
  styleUrls: ['./patica-detail.component.css']
})
export class PaticaDetailComponent implements OnInit {

  patica?: GetPaticaByIdResponse; // Variable para almacenar los detalles de la patica
  userRole: string = ''; // Variable para almacenar el rol del usuario
  paticaSizeEnum = paticaSize; // Enumeración de los tamaños de la patica

  constructor(private route: ActivatedRoute, private paticasService: PaticasService, public userService: UserService) { }

  ngOnInit() {
    this.userRole = this.userService.getRole(); // Obtiene el rol del usuario
    this.route.params // Obtiene los parámetros de la ruta
      .subscribe(params => {
        this.getPaticaDetails(params['id']); // Obtiene los detalles de la patica usando su ID
      })
  }

  // Método privado para obtener los detalles de una patica por su ID
  private getPaticaDetails(id: number) {
    this.paticasService.getDetail({ id: id }) // Llama al servicio para obtener los detalles de la patica
      .pipe()
      .subscribe({
        next: (response: GetPaticaByIdResponse) => { // Maneja la respuesta exitosa
          this.patica = response; // Almacena los detalles de la patica
        },
        error: (error) => { // Maneja los errores
          console.error('Error al cargar los detalles de la patica:', error);
        }
      });
  }
}
