import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GetShelterListRequest } from '../models/get-shelter-list/get-shelter-list.request';
import { GetShelterListItemResponse, GetShelterListResponse } from '../models/get-shelter-list/get-shelter-list.response';
import { GetPaticasListItemResponse } from '../../paticas/models/get-paticas-list/get-paticas-list.response';

@Injectable({
  providedIn: 'root' // Marca este servicio como proporcionado en la raíz del módulo
})
export class ShelterService {
  baseUrl = environment.baseApiUrl; // URL base de la API, obtenida del entorno de desarrollo

  constructor(private httpClient: HttpClient) { } // Constructor del servicio que inyecta HttpClient para realizar solicitudes HTTP

  // Método para obtener la lista de refugios
  public get(request: GetShelterListRequest): Observable<GetShelterListResponse> {
    // Crea un nuevo objeto HttpParams para construir los parámetros de la consulta
    let queryParams = new HttpParams();
    // Agrega el número de página y el tamaño de página a los parámetros de la consulta
    queryParams.set("page", request.page)
    queryParams.set("pageSize", request.pageSize)
    // Realiza una solicitud HTTP GET al servicio de refugios
    // Utiliza la URL base de la API más el endpoint "shelters"
    // y pasa los parámetros de consulta construidos
    return this.httpClient.get<GetShelterListResponse>(`${this.baseUrl}shelters`, { params: queryParams })
  }
  
  public getDetail(shelterId: number): Observable<GetShelterListItemResponse> {
    return this.httpClient.get<GetShelterListItemResponse>(`${this.baseUrl}shelters/${shelterId}`);
  }

  updateShelterLike(shelterId: number, liked: boolean): Observable<GetShelterListItemResponse> {
    return this.httpClient.put<GetShelterListItemResponse>(`${this.baseUrl}/shelters/${shelterId}/like`, { liked });
  }
  updatePaticaLike(paticaId: number, liked: boolean): Observable<GetPaticasListItemResponse> {
    return this.httpClient.put<GetPaticasListItemResponse>(`${this.baseUrl}/paticas/${paticaId}/like`, { liked });
  }
}