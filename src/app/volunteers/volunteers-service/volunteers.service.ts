// Importar los módulos y servicios necesarios de Angular y otros paquetes
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GetVolunteerListRequest } from "../models/get-volunteers-list/get-volunteers-list.request";
import { Observable } from "rxjs";
import { GetVolunteerListItemResponse, GetVolunteerListResponse } from "../models/get-volunteers-list/get-volunteers-list.response";
import { CreateVolunteerRequest } from "../models/create-volunteer/create-volunteer.request";
import { UpdateVolunteerRequest } from "../models/update-volunteer/update-volunteer.request";

@Injectable({
    providedIn: 'root' // Proveedor de servicio a nivel raíz
})
export class VolunteerService {
    baseUrl = environment.api; // Base URL para las solicitudes HTTP

    // Constructor que inyecta el cliente HTTP
    constructor(private httpClient: HttpClient) { }

    // Método para obtener la lista de voluntarios
    public getList(request: GetVolunteerListRequest): Observable<GetVolunteerListResponse> {
        // Crear parámetros de consulta a partir de la solicitud
        let queryParams = new HttpParams();
        queryParams = queryParams.set("page", request.page.toString())
                                 .set("PageSize", request.pageSize.toString());

        // Realizar la solicitud GET y devolver la respuesta como un observable
        return this.httpClient.get<GetVolunteerListResponse>(`${this.baseUrl}volunteers/shelter/10`, { params: queryParams });
    }

    // Método para obtener los detalles de un voluntario por ID
    public getId(volunteerId: number): Observable<GetVolunteerListItemResponse> {
        // Realizar la solicitud GET y devolver la respuesta como un observable
        return this.httpClient.get<GetVolunteerListItemResponse>(`${this.baseUrl}volunteers/${volunteerId}`);
    }

    // Método para crear un nuevo voluntario
    public createVolunteer(request: FormData): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}volunteers`, request, {
            headers: {
                'Accept': 'application/json'
            }
        });
    }
    

    // Método para actualizar los detalles de un voluntario
    public updateVolunteer(volunteerId: number, request: FormData): Observable<GetVolunteerListItemResponse> {
        // Realizar la solicitud PUT para actualizar un voluntario
        return this.httpClient.put<GetVolunteerListItemResponse>(`${this.baseUrl}volunteers/${volunteerId}`, request);
    }

    // Método para eliminar un voluntario
    public deleteVolunteer(volunteerId: number): Observable<any> {
        // Realizar la solicitud DELETE para eliminar un voluntario
        return this.httpClient.delete(`${this.baseUrl}volunteers/${volunteerId}`);
    }
}
