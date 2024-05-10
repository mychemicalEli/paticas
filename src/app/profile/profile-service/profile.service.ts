import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GetShelterProfileResponse } from "../models/get-shelter-profile/get-shelter-profile.response";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { GetUserProfileResponse } from "../models/get-user-profile/get-user-profile.response";
import { GetUserProfileRequest } from "../models/get-user-profile/get-user-profile-paticas.request";
import { GetUserPaticasLikedResponse } from "../models/get-user-profile/get-user-paticas-liked.response";
import { GetUserSheltersLikedResponse } from "../models/get-user-profile/get-user-shelters-liked.response";

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
    
    public getLikedPaticas(request: GetUserProfileRequest): Observable<GetUserPaticasLikedResponse> {
        let params = new HttpParams()
          .set("page", request.page.toString())
          .set("pageSize", request.pageSize.toString());
        
        console.log("Query Params:", params.toString());
        
        return this.httpClient.get<GetUserPaticasLikedResponse>(`${this.baseUrl}profile/user`, { params })
          .pipe(
            map((response: GetUserPaticasLikedResponse) => {
              // Filtrar las paticas con isLiked === true
              response.paticas = response.paticas.filter(patica => patica.liked);
              return response;
            })
          );
      }


      public getLikedShelters(request: GetUserProfileRequest): Observable<GetUserSheltersLikedResponse> {
        let params = new HttpParams()
          .set("page", request.page.toString())
          .set("pageSize", request.pageSize.toString());
        
        console.log("Query Params:", params.toString());
        
        return this.httpClient.get<GetUserSheltersLikedResponse>(`${this.baseUrl}profile/user`, { params })
          .pipe(
            map((response: GetUserSheltersLikedResponse) => {
              // Filtrar las paticas con isLiked === true
              response.shelters = response.shelters.filter(shelter => shelter.liked);
              return response;
            })
          );
      }

      updatePaticaLike(paticaId: number, liked: boolean): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/paticas/${paticaId}/like`, { liked });
      }

      updateShelterLike(shelterId: number, liked: boolean): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/shelters/${shelterId}/like`, { liked });
      }
      
}
