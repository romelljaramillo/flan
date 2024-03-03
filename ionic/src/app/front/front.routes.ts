import { Routes } from '@angular/router';
import { FrontPage } from './front.page';
import { ActionCrud, RouteDataPermission } from '@modules/permission/interfaces/permission.interface';

export const frontRoutes: Routes = [
  {
    path: '',
    component: FrontPage,
    data: { title: 'Home', entity: 'home', action: ActionCrud.list } as RouteDataPermission,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@front/home/home.page').then(
            (m) => m.HomePage
          ),
        data: {
          title: 'Home',
          entity: 'home',
          action: ActionCrud.list,
        } as RouteDataPermission,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
