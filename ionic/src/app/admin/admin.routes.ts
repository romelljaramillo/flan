import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AdminPage } from './admin.page';
import { ActionCrud, RouteDataPermission } from '@modules/permission/interfaces/permission.interface';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminPage,
    data: { title: 'Dashboard', entity: 'dashboard', action: ActionCrud.list } as RouteDataPermission,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@admin/dashboard/dashboard.page').then(
            (m) => m.DashboardPage
          ),
        data: {
          title: 'Dashboard',
          entity: 'dashboard',
          action: ActionCrud.list,
        } as RouteDataPermission,
      },
      {
        path: 'users',
        loadChildren: () => import('@modules/user/user.routes').then(m => m.routesUsers),
        data: { title: 'Users', entity: 'users', action: ActionCrud.list }  as RouteDataPermission,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
