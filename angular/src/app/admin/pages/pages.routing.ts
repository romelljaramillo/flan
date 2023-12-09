

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { ActionCrud, RouteDataPermission } from 'src/app/permission/interfaces/permission.interface';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    data: { title: 'Dashboard', entity: 'dashboard', action: ActionCrud.list } as RouteDataPermission,
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', entity: 'dashboard', action: ActionCrud.list } as RouteDataPermission,
        canLoad: [AuthGuard],
      },
      {
        path: 'users',
        loadChildren: () => import('../../user/user.module').then(m => m.UserModule),
        data: { title: 'Users', entity: 'users', action: ActionCrud.list }  as RouteDataPermission,
      },
      {
        path: 'roles',
        loadChildren: () => import('../../role/role.module').then(m => m.RoleModule),
        data: { title: 'Roles', entity: 'roles', action: ActionCrud.list } as RouteDataPermission,
      },
      {
        path: 'permissions',
        loadChildren: () => import('../../permission/permission.module').then(m => m.PermissionModule),
        data: { title: 'Permissions', entity: 'permissions', action: ActionCrud.list } as RouteDataPermission,
      },
      {
        path: 'langs',
        loadChildren: () => import('../../lang/lang.module').then(m => m.LangModule),
        data: { title: 'Langs', entity: 'langs', action: ActionCrud.list } as RouteDataPermission,
      },
      {
        path: 'sites',
        loadChildren: () => import('../../site/site.module').then(m => m.SiteModule),
        data: { title: 'Sites', entity: 'sites', action: ActionCrud.list } as RouteDataPermission,
      },
      {
        path: 'configurations',
        loadChildren: () => import('../../configuration/configuration.module').then(m => m.ConfigurationModule),
        data: { title: 'Sites', entity: 'sites', action: ActionCrud.list } as RouteDataPermission,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
