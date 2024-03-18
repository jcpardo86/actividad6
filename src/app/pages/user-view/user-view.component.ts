import { Component, NgModule, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { BotoneraComponent } from '../../components/botonera/botonera.component';
import { BotoneraUserViewComponent } from '../../components/botonera-user-view/botonera-user-view.component';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [
    RouterLink,
    BotoneraComponent,
    BotoneraUserViewComponent,
    RouterOutlet,
  ],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private usersService = inject(UsersService);
  unUser?: any = {};
  user: any;

  ngOnInit(): void {
    const userId = 'id';
    this.usersService
      .getById(userId)
      .then((data) => {
        console.log('Usuario obtenido:', data);
        this.user = data;
      })
      .catch((error) => {
        console.error('Error al obtener el usuario:', error);
      });
  }
}
