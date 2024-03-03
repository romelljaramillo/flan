import { Routes } from '@angular/router';
import { AuthPage } from './auth.page';
import { AuthGuard } from './auth.guard';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register.page').then((m) => m.RegisterPage),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
