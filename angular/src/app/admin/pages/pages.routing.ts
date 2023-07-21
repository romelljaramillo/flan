

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { RoleGuard } from 'src/app/role/guards/role.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    data: { title: 'Dashboard', entity: 'dashboard' },
    canActivate: [AuthGuard,RoleGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', entity: 'dashboard' },
        canActivate: [RoleGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('../../user/user.module').then(m => m.UserModule),
        data: { title: 'Users', entity: 'users' },
        canActivate: [RoleGuard]
      },
      {
        path: 'roles',
        loadChildren: () => import('../../role/role.module').then(m => m.RoleModule),
        data: { title: 'Roles', entity: 'roles' },
        canActivate: [RoleGuard]
      },
      {
        path: 'permissions',
        loadChildren: () => import('../../permission/permission.module').then(m => m.PermissionModule),
        data: { title: 'Permissions', entity: 'permissions' },
        canActivate: [RoleGuard]
      },
      {
        path: 'langs',
        loadChildren: () => import('../../lang/lang.module').then(m => m.LangModule),
        data: { title: 'Langs', entity: 'langs' },
        canActivate: [RoleGuard]
      },
      {
        path: 'sites',
        loadChildren: () => import('../../site/site.module').then(m => m.SiteModule),
        data: { title: 'Sites', entity: 'sites' },
        canActivate: [RoleGuard]
      },
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
