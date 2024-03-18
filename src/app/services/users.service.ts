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

  getByPage(page: number, limit: number): Promise<IPaginacion> {
    return lastValueFrom(
      this.httpClient.get<IPaginacion>(`${this.API_URL}?page=${page}&limit=${limit}`)
    );
  }
  async delete(id: string): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.delete<IUser>(`${this.API_URL}/${id}`)
    );
  }

  insert(formValue: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.post<IUser>(this.API_URL, formValue));
  }

  async getById(id: string): Promise<IUser | undefined> {
    const response = await lastValueFrom(
      this.httpClient.get<{ results: IUser[] }>(this.API_URL)
    );
    const user = response.results.find((user) => user._id === id);
    console.log(response.results);
    return user;
  }


}
