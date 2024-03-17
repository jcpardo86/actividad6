import { Component, NgModule, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { BotoneraComponent } from '../../components/botonera/botonera.component';
import { BotoneraUserViewComponent } from '../../components/botonera-user-view/botonera-user-view.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink, BotoneraComponent, BotoneraUserViewComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);
  unUser?: any = {};

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = params.userId;
      try {
        this.unUser = await this.usersService.getById(id);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
