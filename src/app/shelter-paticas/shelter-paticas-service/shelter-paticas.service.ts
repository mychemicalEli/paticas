import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'; // Importar map desde rxjs/operators
import { GetShelterPaticasListRequest } from "../models/get-shelter-paticas-list/get-shelter-paticas-list.request";
import { GetShelterPaticasListItemResponse, GetShelterPaticasListResponse } from "../models/get-shelter-paticas-list/get-shelter-paticas-list.response";
import { AddPaticaRequest } from "../models/add-patica/add-patica.request";
import { UpdatePaticaRequest } from "../models/update-patica/update-patica.request";
import { GetPaticaByIdResponse } from "../../paticas/models/get-patica-by-id/get-patica-by-id.response";
import { GetPaticaByIdRequest } from "../../paticas/models/get-patica-by-id/get-patica-by-id.request";

@Injectable({ 
  providedIn: 'root'
})
export class ShelterPaticasService {
  baseUrl = environment.baseApiUrl; 
  constructor(private httpClient: HttpClient) {} 

  public getList(request: GetShelterPaticasListRequest): Observable<GetShelterPaticasListResponse> {
    let params = new HttpParams()
      .set("page", request.page.toString())
      .set("pageSize", request.pageSize.toString())
      .set("shelterId", request.shelterId.toString());
    
    console.log("Query Params:", params.toString());
    
    return this.httpClient.get<GetShelterPaticasListResponse>(`${this.baseUrl}shelterPaticas`, { params })
      .pipe(
        map((response: GetShelterPaticasListResponse) => {
          // Filtrar las paticas con shelterId !== 10
          response.paticas = response.paticas.filter(patica => patica.shelterId === 10);
          return response;
        })
      );
  }

public addPatica(request: AddPaticaRequest) {
    return this.httpClient.post(`${this.baseUrl}paticas`, request)
}

public updatePatica(request: UpdatePaticaRequest): Observable<GetPaticaByIdResponse> {
  return this.httpClient.put<GetPaticaByIdResponse>(`${this.baseUrl}paticas/edit`, request);
}

public deletePatica(request: GetPaticaByIdRequest): Observable<GetPaticaByIdResponse> {
  return this.httpClient.delete<GetPaticaByIdResponse>(`${this.baseUrl}paticas/${request.id}`); 
}
}
