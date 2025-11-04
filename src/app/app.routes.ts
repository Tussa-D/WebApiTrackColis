import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { LayoutComponent } from './components/layout/layout';
import { DashboardComponent } from './components/dashboard/dashboard';
import { UsersColisListComponent } from './components/users-colis-list/users-colis-list';
import { UsersColisFormComponent } from './components/users-colis-form/users-colis-form';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  // Page d'accueil publique
  { path: '', component: WelcomeComponent },
  
  // Authentification (sans layout)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Routes protégées AVEC layout (sidebar + header)
  {
    path: '',
    component: LayoutComponent,  // ✅ Layout parent
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users-colis', component: UsersColisListComponent },
      { path: 'users-colis/create', component: UsersColisFormComponent },
      { path: 'users-colis/edit/:id', component: UsersColisFormComponent }
    ]
  },
  
  // 404
  { path: '**', redirectTo: '' }
];

