// Importar los módulos y servicios necesarios de Angular y otros paquetes
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'; // Importar el operador map desde rxjs/operators

// Importar los modelos de solicitud y respuesta necesarios
import { GetShelterPaticasListRequest } from "../models/get-shelter-paticas-list/get-shelter-paticas-list.request";
import { GetShelterPaticasListItemResponse, GetShelterPaticasListResponse } from "../models/get-shelter-paticas-list/get-shelter-paticas-list.response";
import { AddPaticaRequest } from "../models/add-patica/add-patica.request";
import { UpdatePaticaRequest } from "../models/update-patica/update-patica.request";
import { GetPaticaByIdResponse } from "../../paticas/models/get-patica-by-id/get-patica-by-id.response";
import { GetPaticaByIdRequest } from "../../paticas/models/get-patica-by-id/get-patica-by-id.request";

@Injectable({
  providedIn: 'root' // Esto hace que el servicio sea singleton y esté disponible en toda la aplicación
})
export class ShelterPaticasService {
  baseUrl = environment.baseApiUrl; // Base URL de la API, configurada en el entorno

  // El constructor inyecta el HttpClient para hacer peticiones HTTP
  constructor(private httpClient: HttpClient) {}

  // Método para obtener una lista de paticas de un refugio
  public getList(request: GetShelterPaticasListRequest): Observable<GetShelterPaticasListResponse> {
    // Configurar los parámetros de la solicitud HTTP
    let params = new HttpParams()
      .set("page", request.page.toString()) // Establecer el número de página
      .set("pageSize", request.pageSize.toString()) // Establecer el tamaño de la página
      .set("shelterId", request.shelterId.toString()); // Establecer el ID del refugio
    
    // Mostrar los parámetros de consulta en la consola para depuración
    console.log("Query Params:", params.toString());
    
    // Realizar la solicitud HTTP GET y procesar la respuesta
    return this.httpClient.get<GetShelterPaticasListResponse>(`${this.baseUrl}shelterPaticas`, { params })
      .pipe(
        map((response: GetShelterPaticasListResponse) => {
          // Filtrar las paticas para incluir solo las que tienen shelterId igual a 10
          response.paticas = response.paticas.filter(patica => patica.shelterId === 10);
          return response; // Devolver la respuesta modificada
        })
      );
  }

  // Método para agregar una nueva patica
  public addPatica(request: AddPaticaRequest) {
    // Realizar una solicitud HTTP POST para agregar la patica
    return this.httpClient.post(`${this.baseUrl}paticas`, request);
  }

  // Método para actualizar una patica existente
  public updatePatica(request: UpdatePaticaRequest): Observable<GetPaticaByIdResponse> {
    // Realizar una solicitud HTTP PUT para actualizar la patica
    return this.httpClient.put<GetPaticaByIdResponse>(`${this.baseUrl}paticas/edit`, request);
  }

  // Método para eliminar una patica por su ID
  public deletePatica(request: GetPaticaByIdRequest): Observable<GetPaticaByIdResponse> {
    // Realizar una solicitud HTTP DELETE para eliminar la patica
    return this.httpClient.delete<GetPaticaByIdResponse>(`${this.baseUrl}paticas/${request.id}`);
  }
}
