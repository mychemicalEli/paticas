import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user-service/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userRole: string = '';
  constructor(public userService: UserService) {}
  ngOnInit() {
    this.userRole = this.userService.getRole();

  }


}
