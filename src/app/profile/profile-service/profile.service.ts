import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { GetShelterProfileResponse } from "../models/get-shelter-profile/get-shelter-profile.response";
import { GetUserProfileResponse } from "../models/get-user-profile/get-user-profile.response";
import { GetUserProfileRequest } from "../models/get-user-profile/get-user-profile-paticas.request";
import { GetUserPaticasLikedResponse } from "../models/get-user-profile/get-user-paticas-liked.response";
import { GetUserSheltersLikedResponse } from "../models/get-user-profile/get-user-shelters-liked.response";
import { GetPaticasListItemResponse } from "../../paticas/models/get-paticas-list/get-paticas-list.response";
import { GetShelterListItemResponse } from "../../shelters/models/get-shelter-list/get-shelter-list.response";
import { UpdateUserRequest } from "../models/update-user-profile/update-user-profile.request";
import { UpdateShelterUserRequest } from "../models/update-shelter-profile/update-shelter-profile.request";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  // Obtener el perfil del refugio
  public getShelterProfile(): Observable<GetShelterProfileResponse> {
    return this.httpClient.get<GetShelterProfileResponse>(`${this.baseUrl}profile/shelter`);
  }

  // Obtener el perfil del usuario
  public getUserProfile(): Observable<GetUserProfileResponse> {
    return this.httpClient.get<GetUserProfileResponse>(`${this.baseUrl}profile/user`);
  }

  // Obtener la lista de paticas que le gustan al usuario
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

  // Obtener la lista de refugios que le gustan al usuario
  public getLikedShelters(request: GetUserProfileRequest): Observable<GetUserSheltersLikedResponse> {
    let params = new HttpParams()
      .set("page", request.page.toString())
      .set("pageSize", request.pageSize.toString());

    console.log("Query Params:", params.toString());

    return this.httpClient.get<GetUserSheltersLikedResponse>(`${this.baseUrl}profile/user`, { params })
      .pipe(
        map((response: GetUserSheltersLikedResponse) => {
          // Filtrar los refugios con isLiked === true
          response.shelters = response.shelters.filter(shelter => shelter.liked);
          return response;
        })
      );
  }

  // Actualizar el estado de "me gusta" de una patica
  updatePaticaLike(paticaId: number, liked: boolean): Observable<GetPaticasListItemResponse> {
    return this.httpClient.put<GetPaticasListItemResponse>(`${this.baseUrl}/paticas/${paticaId}/like`, { liked });
  }

  // Actualizar el estado de "me gusta" de un refugio
  updateShelterLike(shelterId: number, liked: boolean): Observable<GetShelterListItemResponse> {
    return this.httpClient.put<GetShelterListItemResponse>(`${this.baseUrl}/shelters/${shelterId}/like`, { liked });
  }

  // Actualizar el perfil de usuario
  updateUser(request: UpdateUserRequest): Observable<GetUserProfileResponse> {
    return this.httpClient.put<GetUserProfileResponse>(`${this.baseUrl}profile/user`, request);
  }

  // Actualizar el perfil del refugio
  updateShelter(request: UpdateShelterUserRequest): Observable<GetShelterProfileResponse> {
    return this.httpClient.put<GetShelterProfileResponse>(`${this.baseUrl}profile/shelter`, request);
  }
}
