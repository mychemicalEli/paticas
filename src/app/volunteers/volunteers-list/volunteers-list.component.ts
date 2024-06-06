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
  request: GetVolunteerListRequest = { page: 0, pageSize: 6 }; // Objeto de solicitud de lista de voluntarios con valores predeterminados
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
    this.volunteerService.getList(this.request) // Realizar la solicitud para obtener la lista de voluntarios
    .pipe() // Permite encadenar operadores de RxJS
    .subscribe({
      next: (response: GetVolunteerListResponse) => { // Maneja la respuesta exitosa
        this.response = response; // Asigna la respuesta a la variable response
        this.getAvailabilities(response.content); // Actualiza la lista de disponibilidades de voluntarios
      },
      error: (error) => {
        console.error('Error al obtener la lista de voluntarios:', error); // Maneja el error
      }
    });
  }

  // Función para actualizar la lista de disponibilidades de voluntarios
  private getAvailabilities(volunteers: any[]): void {
    const availabilitiesSet = new Set<string>(); // Crear un conjunto para almacenar disponibilidades únicas
    volunteers.forEach(volunteer => { // Itera sobre cada voluntario en la lista
      const availabilityString = volunteerAvailability[volunteer.availability].toLowerCase(); // Convierte la disponibilidad a minúsculas
      availabilitiesSet.add(availabilityString); // Agrega la disponibilidad al conjunto
    });
    this.availabilities = Array.from(availabilitiesSet); // Convierte el conjunto a un array
  }

  // Función para manejar el cambio de página
  onPageChange(pageSize: number): void {
    this.request.page = this.request.page == 0 ? 1 : this.request.page; // Actualiza el número de página en la solicitud
    this.getVolunteersList(); // Obtiene la lista de voluntarios con la nueva configuración
  }

  // Función para manejar el clic en el botón de eliminar
  onDeleteClick(volunteerName: string, volunteerId: number): void {
    this.currentVolunteerName = volunteerName; // Almacena el nombre del voluntario actual
    this.currentVolunteerId = volunteerId; // Almacena el ID del voluntario actual
  }

  // Función para eliminar un voluntario
  deleteVolunteer(volunteerId: number): void {
    this.volunteerService.deleteVolunteer(volunteerId) // Realiza la solicitud para eliminar el voluntario
    .pipe()
    .subscribe({
      next: () => {
        console.log('Voluntario eliminado exitosamente'); // Confirmar la eliminación
        const closeButton = document.getElementById('x'); // Obtener el botón de cierre del modal
        closeButton?.click(); // Cerrar el modal
        this.getVolunteersList(); // Actualizar la lista de voluntarios
      },
      error: (error) => {
        console.error('Error al eliminar el voluntario:', error); // Maneja el error
      }
    });
  }
}
