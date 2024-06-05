// Importar los módulos y servicios necesarios de Angular y otros paquetes
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GetShelterListRequest } from '../models/get-shelter-list/get-shelter-list.request';
import { GetShelterListItemResponse, GetShelterListResponse } from '../models/get-shelter-list/get-shelter-list.response';
import { GetPaticasListItemResponse } from '../../paticas/models/get-paticas-list/get-paticas-list.response';
import { GetShelterByIdRequest } from '../models/get-shelter-detail/get-shelter-detail.request';
import { GetShelterByIdResponse } from '../models/get-shelter-detail/get-shelter-detail.response';

@Injectable({
  providedIn: 'root' // Proveedor de servicio a nivel raíz
})
export class ShelterService {
  baseUrl = environment.baseApiUrl; // Base URL para las solicitudes HTTP

  // Constructor que inyecta el cliente HTTP
  constructor(private httpClient: HttpClient) { }

  // Método para obtener la lista de refugios
  public get(request: GetShelterListRequest): Observable<GetShelterListResponse> {
    // Crear parámetros de consulta a partir de la solicitud
    let queryParams = new HttpParams();
    queryParams = queryParams.set("page", request.page.toString())
                             .set("pageSize", request.pageSize.toString());

    // Realizar la solicitud GET y devolver la respuesta como un observable
    return this.httpClient.get<GetShelterListResponse>(`${this.baseUrl}shelters`, { params: queryParams });
  }
  
  // Método para obtener los detalles de un refugio por ID
  public getDetail(request: GetShelterByIdRequest): Observable<GetShelterByIdResponse> {
    // Realizar la solicitud GET y devolver la respuesta como un observable
    return this.httpClient.get<GetShelterByIdResponse>(`${this.baseUrl}shelters/${request.id}`);
  }

  // Método para actualizar el estado de "me gusta" de un refugio
  updateShelterLike(shelterId: number, liked: boolean): Observable<GetShelterListItemResponse> {
    // Realizar la solicitud PUT y devolver la respuesta como un observable
    return this.httpClient.put<GetShelterListItemResponse>(`${this.baseUrl}/shelters/${shelterId}/like`, { liked });
  }

  // Método para actualizar el estado de "me gusta" de una patica
  updatePaticaLike(paticaId: number, liked: boolean): Observable<GetPaticasListItemResponse> {
    // Realizar la solicitud PUT y devolver la respuesta como un observable
    return this.httpClient.put<GetPaticasListItemResponse>(`${this.baseUrl}/paticas/${paticaId}/like`, { liked });
  }
}
