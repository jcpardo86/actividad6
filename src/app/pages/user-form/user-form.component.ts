import { Component, inject } from '@angular/core';
import { FormControl,  FormGroup,  ReactiveFormsModule,  Validators,} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  usersForm: FormGroup;
  usersService = inject(UsersService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.usersForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        first_name: new FormControl('', []),
        last_name: new FormControl('', []),
        email: new FormControl('', [Validators.email]),
        image: new FormControl('', []),
        password: new FormControl('', [Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) ]),
      },
      []
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        const response = await this.usersService.getById(params.id);
        if (response) {
          this.usersForm = new FormGroup(
            {
              _id: new FormControl(response._id),
              username: new FormControl(response.username, [Validators.required]),
              first_name: new FormControl(response.first_name, []),
              last_name: new FormControl(response.last_name, []),
              email: new FormControl(response.email, [Validators.email]),
              image: new FormControl(response.image, []),
              password: new FormControl(response.password, [Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
            },
            []
          );
        }
      }
    });
  }

  async getDataForm() {
    if (this.usersForm.value._id) {
      const response = await this.usersService.update(this.usersForm.value);
      if (response.id) {
        Swal.fire(
          `El usuario ${response.username} se ha actualizado correctamente`
        );
        this.router.navigate(['/users']);
      } else {
        Swal.fire('Ha habido un problema intentalo de nuevo');
      }
    } else {
      const response = await this.usersService.insert(this.usersForm.value);
      if (response.id) {
        Swal.fire(
          `El usuario ${response.username} se ha añadido correctamente`
        );
        this.router.navigate(['/users']);
      } else {
        Swal.fire('Ha habido un problema intentalo de nuevo');
      }
    }
  }
}
