import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment"; // Importa la configuración del entorno
import { HttpClient } from "@angular/common/http"; // Importa el módulo HttpClient para hacer solicitudes HTTP
import { CreateVolunteerFormRequest } from "../models/create-volunteer/create-volunteer.request"; // Importa el modelo de solicitud de formulario de voluntariado

@Injectable({
    providedIn: 'root' // Indica que este servicio estará disponible en toda la aplicación
})
export class VolunteerFormService {

    baseUrl = environment.baseApiUrl; // URL base de la API obtenida del entorno

    constructor(private httpClient: HttpClient) {} // Constructor del servicio, inyecta HttpClient

    // Método para enviar una solicitud de creación de formulario de voluntariado
    public createVolunteerForm(request: CreateVolunteerFormRequest) {
        return this.httpClient.post(`${this.baseUrl}formularios/volunteer`, request); // Hace una solicitud HTTP POST al endpoint de creación de formulario de voluntariado
    }
}
