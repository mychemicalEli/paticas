import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { CreateVolunteerFormRequest } from "../models/create-volunteer/create-volunteer.request";

@Injectable({
    providedIn: 'root'
})

export class VolunteerFormService {
    baseUrl = environment.baseApiUrl; 

    constructor(private httpClient: HttpClient){}
    public createVolunteerForm(request:CreateVolunteerFormRequest){
        return this.httpClient.post(`${this.baseUrl}formularios/volunteer`,request)
      }
}