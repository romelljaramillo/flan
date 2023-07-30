

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { PermissionGuard } from 'src/app/permission/guards/permission.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    data: { title: 'Dashboard', entity: 'dashboard' },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', entity: 'dashboard' },
        // canActivate: [PermissionGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('../../user/user.module').then(m => m.UserModule),
        data: { title: 'Users', entity: 'users' },
        // canActivate: [PermissionGuard]
      },
      {
        path: 'roles',
        loadChildren: () => import('../../role/role.module').then(m => m.RoleModule),
        data: { title: 'Roles', entity: 'roles' },
        // canActivate: [PermissionGuard]
      },
      {
        path: 'permissions',
        loadChildren: () => import('../../permission/permission.module').then(m => m.PermissionModule),
        data: { title: 'Permissions', entity: 'permissions' },
        canActivate: [PermissionGuard]
      },
      {
        path: 'langs',
        loadChildren: () => import('../../lang/lang.module').then(m => m.LangModule),
        data: { title: 'Langs', entity: 'langs' },
        canActivate: [PermissionGuard]
      },
      {
        path: 'sites',
        loadChildren: () => import('../../site/site.module').then(m => m.SiteModule),
        data: { title: 'Sites', entity: 'sites' },
        canActivate: [PermissionGuard]
      },
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
