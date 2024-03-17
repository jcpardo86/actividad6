import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  usersService = inject(UsersService);
  arrUsers: IUser[] = [];

  async ngOnInit(): Promise<void> {
    try {
      this.arrUsers = await this.usersService.getAllUsers();
    } catch (err) {
      console.log(err);
    }
  }
}
