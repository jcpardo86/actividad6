import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: 'home', component: UserListComponent },
  { path: 'user/:userid', component: UserViewComponent },
  { path: 'new/user', component: UserFormComponent },
  { path: 'update/user/:id', component: UserFormComponent },
  { path: '**', redirectTo: 'home' },
];
