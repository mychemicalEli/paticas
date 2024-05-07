import { Component } from '@angular/core';
import { GetVolunteerListRequest } from '../models/get-volunteers-list/get-volunteers-list.request';
import { GetVolunteerListResponse } from '../models/get-volunteers-list/get-volunteers-list.response';
import { VolunteerService } from '../volunteers-service/volunteers.service';
import { volunteerAvailability } from '../models/volunteer-availability.enum';

@Component({
  selector: 'app-volunteers-list',
  templateUrl: './volunteers-list.component.html',
  styleUrls: ['./volunteers-list.component.css']
})
export class VolunteersListComponent {
  request: GetVolunteerListRequest = { page: 0, pageSize: 6 };
  response?: GetVolunteerListResponse;
  availabilities: string[] = [];
  availability = volunteerAvailability;
  currentVolunteerName: string = '';
  currentVolunteerId: number = 0;

  constructor(private volunteerService: VolunteerService) { }

  ngOnInit(): void {
    this.getVolunteersList();
  }

  private getVolunteersList() {
    this.volunteerService.getList(this.request)
      .subscribe({
        next: (response: GetVolunteerListResponse) => {
          this.response = response;
          this.getAvailabilities(response.volunteers);
        }
      });
  }

  private getAvailabilities(volunteers: any[]) {
    const availabilitiesSet = new Set<string>();
    volunteers.forEach(volunteer => {
      const availabilityString = volunteerAvailability[volunteer.availability].toLowerCase();
      availabilitiesSet.add(availabilityString);
    });
    this.availabilities = Array.from(availabilitiesSet);
  }


  onPageChange(pageSize: number) {
    this.request.page = pageSize;
    this.getVolunteersList();
  }

  onDeleteClick(volunteerName: string, volunteerId: number) {
    this.currentVolunteerName = volunteerName;
    this.currentVolunteerId = volunteerId;
  }

  deleteVolunteer(volunteerId: number) {
    this.volunteerService.deleteVolunteer(volunteerId).subscribe({
      next: () => {
        console.log('Voluntario eliminado exitosamente');
        const closeButton = document.getElementById('x');
        closeButton?.click();
      },
      error: (error) => {
        console.error('Error al eliminar el voluntario:', error);
      }
    });
  }
}