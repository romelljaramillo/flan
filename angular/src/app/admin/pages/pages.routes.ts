

import { Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '@adminModule/auth/guards/auth.guard';
import { ActionCrud, RouteDataPermission } from '@adminModule/permission/interfaces/permission.interface';

export const pageRoutes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    data: { title: 'Dashboard', entity: 'dashboard', action: ActionCrud.list } as RouteDataPermission,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('@adminModule/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: { title: 'Dashboard', entity: 'dashboard', action: ActionCrud.list } as RouteDataPermission,
      },
      {
        path: 'users',
        loadComponent: () => import('@adminModule/user/user.component').then(m => m.UserComponent),
        data: { title: 'Users', entity: 'users', action: ActionCrud.list }  as RouteDataPermission,
      },
      {
        path: 'roles',
        loadComponent: () => import('@adminModule/role/role.component').then(m => m.RoleComponent),
        data: { title: 'Roles', entity: 'roles', action: ActionCrud.list } as RouteDataPermission,
      },
      {
        path: 'permissions',
        loadComponent: () => import('@adminModule/permission/permission.component').then(m => m.PermissionComponent),
        data: { title: 'Permissions', entity: 'permissions', action: ActionCrud.list } as RouteDataPermission,
      },
      {
        path: 'langs',
        loadComponent: () => import('@adminModule/lang/lang.component').then(m => m.LangComponent),
        data: { title: 'Langs', entity: 'langs', action: ActionCrud.list } as RouteDataPermission,
      },
      {
        path: 'sites',
        loadComponent: () => import('@adminModule/site/site.component').then(m => m.SiteComponent),
        data: { title: 'Sites', entity: 'sites', action: ActionCrud.list } as RouteDataPermission,
      },
      {
        path: 'configurations',
        loadComponent: () => import('@adminModule/configuration/configuration.component').then(m => m.ConfigurationComponent),
        data: { title: 'Sites', entity: 'sites', action: ActionCrud.list } as RouteDataPermission,
      },
      // {
      //   path:'', redirectTo: 'home', pathMatch: 'full',
      // }
    ]
  },
];

