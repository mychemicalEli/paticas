import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { CreateAdoptionFormRequest } from "../models/create-adoption/create-adoption.request";


@Injectable ({
    providedIn: 'root'

})


export class AdoptionFormService{

    baseUrl = environment.baseApiUrl; 

    constructor(private httpClient: HttpClient){}
    
    public createAdoptionForm(request:CreateAdoptionFormRequest){
        return this.httpClient.post(`${this.baseUrl}formularios/adoption`,request)
      }
}