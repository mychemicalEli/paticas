import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GetVolunteerListRequest } from "../models/get-volunteers-list/get-volunteers-list.request";
import { Observable } from "rxjs";
import { GetVolunteerListResponse } from "../models/get-volunteers-list/get-volunteers-list.response";


@Injectable({
    providedIn: 'root'
})

export class VolunteerService {
    baseUrl = environment.baseApiUrl;

    constructor(private httpClient: HttpClient) { }

    public get(request: GetVolunteerListRequest): Observable<GetVolunteerListResponse> {

        let queryParams = new HttpParams();
        queryParams.set("page", request.page)
        queryParams.set("pageSize", request.pageSize)

        return this.httpClient.get<GetVolunteerListResponse>(`${this.baseUrl}volunteers`, { params: queryParams })


    }
}