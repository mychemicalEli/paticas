import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GetPaticasListRequest } from "../models/get-paticas-list/get-paticas-list.request";
import { Observable } from "rxjs";
import { GetPaticasListResponse } from "../models/get-paticas-list/get-paticas-list.response";
import { GetPaticaDetailResponse } from "../models/get-patica-by-id/get-patica-detail.response";

@Injectable({
  providedIn: 'root'
})
export class PaticasService {
  baseUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) {}

  public getList(request: GetPaticasListRequest): Observable<GetPaticasListResponse> {
    let params = new HttpParams()
      .set("page", request.page.toString())
      .set("pageSize", request.pageSize.toString());
      console.log("Query Params:", params.toString());

    return this.httpClient.get<GetPaticasListResponse>(`${this.baseUrl}paticas`, { params });
  }
  public getDetail(paticaId: number): Observable<GetPaticaDetailResponse> {
    return this.httpClient.get<GetPaticaDetailResponse>(`${this.baseUrl}paticas/${paticaId}`);
  }
}
