import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { lastValueFrom } from 'rxjs';
import { IPaginacion } from '../interfaces/ipaginacion.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpClient = inject(HttpClient);
  API_URL = 'https://peticiones.online/api/users';

  getAllUsers(): Promise<IUser[]> {
    return lastValueFrom(
      this.httpClient.get<{ results: IUser[] }>(this.API_URL)
    ).then((response) => response.results);
  }

  getById(id: string): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<{ results: IUser[] }>(this.API_URL)
    ).then((response) => {
      console.log(response.results)
      const user = response.results.find((user) => user._id === id);
      return user;
    });
  }
    getUsers(page: number, perPage: number): Promise<IPaginacion> {
    const params = {
      page: page.toString(),
      per_page: perPage.toString()
    };

    return lastValueFrom(this.httpClient.get<IPaginacion>(this.API_URL, { params }));
  }

  delete(id: string): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.delete<IUser>(`${this.API_URL}/${id}`)
    );
  }

  insert(formValue: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.post<IUser>(this.API_URL, formValue));
  }

  update(formValue: IUser): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.put<IUser>(`${this.API_URL}/${formValue._id}`, formValue)
    );
  }
}

