import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GetPaticasListRequest } from "../models/get-paticas-list/get-paticas-list.request";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { GetPaticasListItemResponse, GetPaticasListResponse } from "../models/get-paticas-list/get-paticas-list.response";

// Decorador Injectable para marcar esta clase como un servicio inyectable
@Injectable({ 
  providedIn: 'root' // Este servicio se proporciona en la raíz del módulo
})


export class PaticasService {
  // URL base de la API, obtenida del entorno de desarrollo
  baseUrl = environment.baseApiUrl; 

  // Constructor del servicio que inyecta HttpClient para realizar solicitudes HTTP
  constructor(private httpClient: HttpClient) {} 

  // Método para obtener una lista de "paticas"
  // Recibe un objeto GetPaticasListRequest con información sobre la página y el tamaño de la página
  // Devuelve un Observable de GetPaticasListResponse
  public getList(request: GetPaticasListRequest): Observable<GetPaticasListResponse> {
    // Se construyen los parámetros para la solicitud HTTP
    let params = new HttpParams()
      .set("page", request.page.toString())
      .set("pageSize", request.pageSize.toString());
      // Se imprime la cadena de consulta para verificación
      console.log("Query Params:", params.toString());

      // Se realiza la solicitud HTTP GET con los parámetros construidos
    return this.httpClient.get<GetPaticasListResponse>(`${this.baseUrl}paticas`, { params });
  }

  // Método para obtener los detalles de una "patica" específica
  // Recibe el ID de la "patica" como parámetro
  // Devuelve un Observable de GetPaticasListItemResponse
  public getDetail(paticaId: number): Observable<GetPaticasListItemResponse> {
    return this.httpClient.get<GetPaticasListItemResponse>(`${this.baseUrl}paticas/${paticaId}`);
  }

  public getListFilteredByShelter(request: GetPaticasListRequest, shelterId: number): Observable<GetPaticasListResponse> {
    let params = new HttpParams()
      .set("page", request.page.toString())
      .set("pageSize", request.pageSize.toString())
      .set("shelterId", shelterId.toString());
    
    console.log("Query Params:", params.toString());
    
    return this.httpClient.get<GetPaticasListResponse>(`${this.baseUrl}paticas`, { params });
  }

  updatePaticaLike(paticaId: number, liked: boolean): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/paticas/${paticaId}/like`, { liked });
  }
 
  }
  
 

