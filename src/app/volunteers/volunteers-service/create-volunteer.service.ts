import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { CreateVolunteerRequest } from "../models/create-volunteer/create-volunteer.request";

@Injectable({
    providedIn: 'root'
})

export class CreateVolunteerService {
    baseUrl = environment.baseApiUrl; 

    constructor(private httpClient: HttpClient){}
    public createVolunteer(request:CreateVolunteerRequest){
        return this.httpClient.post(`${this.baseUrl}create`,request)
      }
}