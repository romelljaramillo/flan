import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { PermissionGuard } from 'src/app/permission/guards/permission.guard';
import { PermissionComponent } from './permission.component';

const routes: Routes = [
  {
    path: '',
    component: PermissionComponent,
    data: { title: 'Permissions', entity: 'permissions' },
    canActivate: [AuthGuard, PermissionGuard],
    canLoad: [AuthGuard, PermissionGuard],
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PermissionRoutingModule { }