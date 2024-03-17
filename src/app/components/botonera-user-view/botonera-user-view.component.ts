import { Component, Input, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-botonera-user-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botonera-user-view.component.html',
  styleUrl: './botonera-user-view.component.css',
})
export class BotoneraUserViewComponent {
  @Input() parent: string = '';
  @Input() userId: string | undefined = '';
  usersService = inject(UsersService);

  async borrarUser(id: string | undefined) {
    if (id !== undefined) {
      let confirmacion = confirm(
        'Seguro que quiere borrar al usuario' + this.userId
      );
      if (confirmacion) {
        //borrar
        let response = await this.usersService.delete(id);
        if (response._id) {
          alert('Se ha borrado correctamente el usuario ' + response.username);
        }
      }
    }
  }
}
