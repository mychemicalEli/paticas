import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GetPaticasListRequest } from "../models/get-paticas-list/get-paticas-list.request";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { GetPaticasListItemResponse, GetPaticasListResponse } from "../models/get-paticas-list/get-paticas-list.response";
import { GetPaticaByIdRequest } from "../models/get-patica-by-id/get-patica-by-id.request";
import { GetPaticaByIdResponse } from "../models/get-patica-by-id/get-patica-by-id.response";

@Injectable({
  providedIn: 'root'
})


export class PaticasService {
  baseUrl = environment.baseApiUrl;
  baseUrl2 = environment.api;

  constructor(private httpClient: HttpClient) { }

  // Método para obtener la lista de paticas paginada
  public getList(request: GetPaticasListRequest): Observable<GetPaticasListResponse> {
    let params = new HttpParams()
      .set("page", request.page.toString())
      .set("pageSize", request.pageSize.toString());
    console.log("Query Params:", params.toString()); // Mostrar parámetros de consulta en la consola
    return this.httpClient.get<GetPaticasListResponse>(`${this.baseUrl2}pets/shelter/10`, { params });
  }

  // Método para obtener los detalles de una patica por su ID
  public getDetail(request: GetPaticaByIdRequest): Observable<GetPaticaByIdResponse> {
    return this.httpClient.get<GetPaticaByIdResponse>(`${this.baseUrl2}pets/${request.id}`);
  }

  // Método para obtener la lista de paticas filtrada por refugio
  public getListFilteredByShelter(request: GetPaticasListRequest, shelterId: number): Observable<GetPaticasListResponse> {
    let params = new HttpParams()
      .set("page", request.page.toString())
      .set("pageSize", request.pageSize.toString())
    console.log("Query Params:", params.toString()); // Mostrar parámetros de consulta en la consola
    return this.httpClient.get<GetPaticasListResponse>(`${this.baseUrl2}pets/shelter/10`, { params });
  }

  // Método para actualizar el estado de "Me gusta" de una patica
  updatePaticaLike(paticaId: number, liked: boolean): Observable<GetPaticasListItemResponse> {
    return this.httpClient.put<GetPaticasListItemResponse>(`${this.baseUrl}paticas/${paticaId}/like`, { liked });
  }


}



