import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.routes').then( m => m.adminRoutes)
  },
  {
    path: 'home',
    loadChildren: () => import('./front/front.routes').then((m) => m.frontRoutes),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: '403-unauthorized',  loadComponent: () => import('@shared/pages/unauthorized.page').then((m) => m.UnauthorizedPage) },
  { path: '**', loadComponent: () => import('@shared/pages/notfound.page').then((m) => m.NotFoundPage) },
];
