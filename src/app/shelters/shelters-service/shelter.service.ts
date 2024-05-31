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
  providedIn: 'root'
})
export class ShelterService {
  baseUrl = environment.baseApiUrl; 

  constructor(private httpClient: HttpClient) { } 

  public get(request: GetShelterListRequest): Observable<GetShelterListResponse> {
   
    let queryParams = new HttpParams();
    queryParams.set("page", request.page)
    queryParams.set("pageSize", request.pageSize)
    return this.httpClient.get<GetShelterListResponse>(`${this.baseUrl}shelters`, { params: queryParams })
  }
  
  public getDetail(request: GetShelterByIdRequest): Observable<GetShelterByIdResponse> {
    return this.httpClient.get<GetShelterByIdResponse>(`${this.baseUrl}shelters/${request.id}`);
  }

  updateShelterLike(shelterId: number, liked: boolean): Observable<GetShelterListItemResponse> {
    return this.httpClient.put<GetShelterListItemResponse>(`${this.baseUrl}/shelters/${shelterId}/like`, { liked });
  }
  updatePaticaLike(paticaId: number, liked: boolean): Observable<GetPaticasListItemResponse> {
    return this.httpClient.put<GetPaticasListItemResponse>(`${this.baseUrl}/paticas/${paticaId}/like`, { liked });
  }
}