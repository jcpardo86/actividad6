import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-botonera',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css',
})
export class BotoneraComponent {
  @Input() parent: string = '';
  @Input() userId: string | undefined = '';
  usersService = inject(UsersService);

  async borrarUser(id: string | undefined) {
    if (id !== undefined) {
      let confirmacion = confirm(
        'Quiere borrar al usuario' + this.userId + '?'
      );
      if (confirmacion) {
        //borrar
        let response = await this.usersService.delete(id);
        if (response._id) {
          alert('El usuario ' + response.username +' ha sido borrado correctamente');
        }
      }
    }
  }
}
