import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GetVolunteerListRequest } from "../models/get-volunteers-list/get-volunteers-list.request";
import { Observable } from "rxjs";
import { GetVolunteerListItemResponse, GetVolunteerListResponse } from "../models/get-volunteers-list/get-volunteers-list.response";
import { CreateVolunteerRequest } from "../models/create-volunteer/create-volunteer.request";
import { UpdateVolunteerRequest } from "../models/update-volunteer/update-volunteer.request";


@Injectable({
    providedIn: 'root'
})

export class VolunteerService {
    baseUrl = environment.baseApiUrl;

    constructor(private httpClient: HttpClient) { }

    public getList(request: GetVolunteerListRequest): Observable<GetVolunteerListResponse> {

        let queryParams = new HttpParams();
        queryParams.set("page", request.page)
        queryParams.set("pageSize", request.pageSize)

        return this.httpClient.get<GetVolunteerListResponse>(`${this.baseUrl}volunteers`, { params: queryParams })
    }

    public getId(volunteerId: number): Observable<GetVolunteerListItemResponse> {
        return this.httpClient.get<GetVolunteerListItemResponse>(`${this.baseUrl}volunteers/${volunteerId}`);
    }


    public createVolunteer(request: CreateVolunteerRequest) {
        return this.httpClient.post(`${this.baseUrl}/volunteers/create`, request)
    }

    public updateVolunteer(volunteerId: number, request: UpdateVolunteerRequest): Observable<GetVolunteerListItemResponse> {
        return this.httpClient.put<GetVolunteerListItemResponse>(`${this.baseUrl}volunteers/${volunteerId}/edit`, request);
    }

    public deleteVolunteer(volunteerId: number): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}/${volunteerId}`);
      }

      
      
}