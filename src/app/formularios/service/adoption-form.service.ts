import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment"; // Importa la configuración del entorno
import { HttpClient } from "@angular/common/http"; // Importa el módulo HttpClient para hacer solicitudes HTTP
import { CreateAdoptionFormRequest } from "../models/create-adoption/create-adoption.request"; // Importa el modelo de solicitud de formulario de adopción

@Injectable({
    providedIn: 'root' // Indica que este servicio estará disponible en toda la aplicación
})
export class AdoptionFormService {

    baseUrl = environment.baseApiUrl; // URL base de la API obtenida del entorno

    constructor(private httpClient: HttpClient) {} // Constructor del servicio, inyecta HttpClient

    // Método para enviar una solicitud de creación de formulario de adopción
    public createAdoptionForm(request: CreateAdoptionFormRequest) {
        return this.httpClient.post(`${this.baseUrl}formularios/adoption`, request); // Hace una solicitud HTTP POST al endpoint de creación de formulario de adopción
    }
}
