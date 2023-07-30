import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { PermissionGuard } from 'src/app/permission/guards/permission.guard';
import { RoleComponent } from './role.component';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
    data: { title: 'Roles', entity: 'roles' },
    canActivate: [AuthGuard, PermissionGuard],
    // canLoad: [AuthGuard, PermissionGuard],
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RoleRoutingModule { }