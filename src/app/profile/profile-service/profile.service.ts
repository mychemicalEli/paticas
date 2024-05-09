import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { GetShelterProfileResponse } from "../models/get-shelter-profile/get-shelter-profile.response";
import { Observable } from "rxjs";
import { GetUserProfileResponse } from "../models/get-user-profile/get-user-profile.response";

@Injectable({
    providedIn: 'root'
})
export class ProfileService{
    baseUrl = environment.baseApiUrl;
    constructor(private httpClient: HttpClient) { }

    public getShelterProfile(): Observable<GetShelterProfileResponse> {
        return this.httpClient.get<GetShelterProfileResponse>(`${this.baseUrl}profile/shelter`);
    }

    public getUserProfile(): Observable<GetUserProfileResponse> {
        return this.httpClient.get<GetUserProfileResponse>(`${this.baseUrl}profile/user`);
    }
    
}
