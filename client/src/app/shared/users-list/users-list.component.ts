import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent{

  public usersService = inject(UsersService);

}
