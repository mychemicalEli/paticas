import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  selectedUserType: string = '';
  showUserFields: boolean = false;
  showShelterFields: boolean = false;

  onUserTypeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedUserType = value;
    this.showUserFields = value === 'user';
    this.showShelterFields = value === 'shelterAdmin';
  }
}
