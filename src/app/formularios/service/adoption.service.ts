import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { CreateAdoptionRequest } from "../models/create-adoption/create-adoption.request";


@Injectable ({
    providedIn: 'root'

})


export class AdoptionService{

    baseUrl = environment.baseApiUrl; 

    constructor(private httpClient: HttpClient){}
    
    public createAdoption(request:CreateAdoptionRequest){
        return this.httpClient.post(`${this.baseUrl}formularios/adoption`,request)
      }
}