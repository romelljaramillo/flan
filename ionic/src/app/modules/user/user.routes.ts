import { Routes } from '@angular/router';

import { UserPage } from './user.page';
import { ActionCrud, RouteDataPermission } from '../permission/interfaces/permission.interface';
import { AuthGuard } from '@auth/auth.guard';

export const routesUsers: Routes = [
  {
    path: '',
    component: UserPage,
    data: { title: 'Users', entity: 'users', action: ActionCrud.list } as RouteDataPermission,
    canLoad: [AuthGuard],
    // children: [
    //   {
    //     path: 'edit/:id',
    //     loadComponent: () =>
    //       import('./user.page').then((m) => m.UserPage),
    //   },
    //   {
    //     path: '',
    //     redirectTo: 'users',
    //     pathMatch: 'full',
    //   },
    // ],
  }
]