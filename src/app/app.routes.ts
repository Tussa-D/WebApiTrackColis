import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { UsersColisListComponent } from './components/users-colis-list/users-colis-list';
import { UsersColisFormComponent } from './components/users-colis-form/users-colis-form';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users-colis',
    component: UsersColisListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users-colis/create',
    component: UsersColisFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users-colis/edit/:id',
    component: UsersColisFormComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];