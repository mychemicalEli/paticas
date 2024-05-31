import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user-service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css' // Debería ser styleUrls
})
export class ProfileComponent implements OnInit {
  userRole: string=''; // Variable para almacenar el rol del usuario

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Al inicializar el componente, se obtiene el rol del usuario utilizando el servicio UserService
    this.userRole = this.userService.getRole();
  }
}
