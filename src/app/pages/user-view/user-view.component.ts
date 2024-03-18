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
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);
  unUser!: IUser;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
    const id  = params.user_id;
      try {
        this.unUser = await this.usersService.getById(id)
      } catch (error) {
        console.log(error);
      }
    })
  }
}
