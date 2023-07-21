import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { RoleGuard } from 'src/app/role/guards/role.guard';
import { PermissionComponent } from './permission.component';

const routes: Routes = [
  {
    path: '',
    component: PermissionComponent,
    data: { title: 'Permissions', entity: 'permissions' },
    canActivate: [AuthGuard, RoleGuard],
    canLoad: [AuthGuard, RoleGuard],
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PermissionRoutingModule { }