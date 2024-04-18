import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GetShelterListRequest } from '../dto/get-shelter-list/get-shelter-list.request';
import { GetShelterListResponse } from '../dto/get-shelter-list/get-shelter-list.response';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {

  baseUrl = environment.baseApiUrl;
  constructor(private httpClient: HttpClient) { }


  public get(request: GetShelterListRequest): Observable<GetShelterListResponse> {

    let queryParams = new HttpParams();
    queryParams.set("page",request.page)
    queryParams.set("pageSize",request.pageSize)
    
    return this.httpClient.get<GetShelterListResponse>(`${this.baseUrl}shelters`, { params: queryParams })
  }
}