import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GetPaticasListRequest } from "../models/get-paticas-list/get-paticas-list.request";
import { Observable } from "rxjs";
import { GetPaticasListResponse } from "../models/get-paticas-list/get-paticas-list.response";

@Injectable({
  providedIn: 'root'
})
export class PaticasService {
  baseUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) {}

  public get(request: GetPaticasListRequest): Observable<GetPaticasListResponse> {
    let params = new HttpParams()
      .set("page", request.page.toString())
      .set("pageSize", request.pageSize.toString());
      console.log("Query Params:", params.toString());

    return this.httpClient.get<GetPaticasListResponse>(`${this.baseUrl}paticas`, { params });
  }
}
