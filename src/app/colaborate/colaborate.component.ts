import { Component } from '@angular/core';
import { UserService } from '../auth/user-service/user.service';

@Component({
  selector: 'app-colaborate',
  templateUrl: './colaborate.component.html',
  styleUrl: './colaborate.component.css'
})
export class ColaborateComponent {
  userRole!: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userRole = this.userService.getUserRole();
  }
}
