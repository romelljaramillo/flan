import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PermissionComponent } from './permission.component';
import { ActionCrud, RouteDataPermission } from './interfaces/permission.interface';

const routes: Routes = [
  {
    path: '',
    component: PermissionComponent,
    data: { title: 'Permissions', entity: 'permissions', action: ActionCrud.list } as RouteDataPermission,
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PermissionRoutingModule { }