// Importar los módulos y servicios necesarios de Angular y otros paquetes
import { Component } from '@angular/core';
import { GetVolunteerListRequest } from '../models/get-volunteers-list/get-volunteers-list.request';
import { GetVolunteerListResponse } from '../models/get-volunteers-list/get-volunteers-list.response';
import { VolunteerService } from '../volunteers-service/volunteers.service';
import { volunteerAvailability } from '../models/volunteer-availability.enum'; // Enum para la disponibilidad de voluntarios
import { UserService } from '../../auth/user-service/user.service';

@Component({
  selector: 'app-volunteers-list', // Selector utilizado en el template HTML para este componente
  templateUrl: './volunteers-list.component.html', // Ruta al archivo de template HTML
  styleUrls: ['./volunteers-list.component.css'] // Ruta al archivo de estilos CSS
})
export class VolunteersListComponent {
  userRole: string = ''; // Variable para almacenar el rol del usuario
  request: GetVolunteerListRequest = { page: 0, pageSize: 5 }; // Objeto de solicitud de lista de voluntarios con valores predeterminados
  response?: GetVolunteerListResponse; // Variable para almacenar la respuesta de la solicitud de lista de voluntarios
  availabilities: string[] = []; // Array para almacenar las disponibilidades de los voluntarios
  availability = volunteerAvailability; // Enum para la disponibilidad de voluntarios
  currentVolunteerName: string = ''; // Variable para almacenar el nombre del voluntario actual
  currentVolunteerId: number = 0; // Variable para almacenar el ID del voluntario actual

  // Constructor que inyecta los servicios de voluntarios y usuarios
  constructor(private volunteerService: VolunteerService, private userService: UserService) { }

  // Método de ciclo de vida de Angular que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.userRole = this.userService.getRole(); // Obtener el rol del usuario
    this.getVolunteersList(); // Llamar a la función para obtener la lista de voluntarios
  }

  // Función para obtener la lista de voluntarios
  private getVolunteersList(): void {
    console.log('Requesting volunteers with page:', this.request.page);
    this.volunteerService.getList(this.request)
      .subscribe({
        next: (response: GetVolunteerListResponse) => {
          console.log('Response received:', response);
          this.response = response;
          if (response.content && response.content.length > 0) {
            this.getAvailabilities(response.content);
          } else {
            console.warn('No volunteers found');
          }
        },
        error: (error) => {
          console.error('Error al obtener la lista de voluntarios:', error);
        }
      });
  }
  
  

  // Función para actualizar la lista de disponibilidades de voluntarios
  private getAvailabilities(volunteers: any[]): void {
    const availabilitiesSet = new Set<string>();
    volunteers.forEach(volunteer => {
      if (volunteer && volunteer.availability) { // Asegúrate de que volunteer y volunteer.availability no son null o undefined
        const availabilityString = volunteerAvailability[volunteer.availability].toLowerCase();
        availabilitiesSet.add(availabilityString);
      }
    });
    this.availabilities = Array.from(availabilitiesSet);
  }
  

  // Función para manejar el cambio de página
  onPageChange(page: number) {
    // Actualiza el número de página en la solicitud y vuelve a obtener la lista de "paticas"
    this.request.page = page;
  }

  // Función para manejar el clic en el botón de eliminar
  onDeleteClick(volunteerName: string, volunteerId: number): void {
    this.currentVolunteerName = volunteerName; // Almacena el nombre del voluntario actual
    this.currentVolunteerId = volunteerId; // Almacena el ID del voluntario actual
  }

  // Función para eliminar un voluntario
  deleteVolunteer(volunteerId: number): void {
    this.volunteerService.deleteVolunteer(volunteerId)
      .subscribe({
        next: () => {
          console.log('Voluntario eliminado exitosamente');
          const closeButton = document.getElementById('x');
          closeButton?.click();
          this.request.page = 0; // Resetear la página a 0 si es necesario
          this.getVolunteersList(); // Actualizar la lista de voluntarios
        },
        error: (error) => {
          console.error('Error al eliminar el voluntario:', error);
        }
      });
  }
  
  
}
