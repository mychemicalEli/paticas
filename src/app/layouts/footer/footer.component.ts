import { Component } from '@angular/core';
import { UserService } from '../../auth/user-service/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})


export class FooterComponent {
  userRole!: string;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
  this.userRole = this.userService.getUserRole();
  }
}
