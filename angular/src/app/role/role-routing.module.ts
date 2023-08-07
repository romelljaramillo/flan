import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleComponent } from './role.component';
import { ActionCrud, RouteDataPermission } from '../permission/interfaces/permission.interface';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
    data: { title: 'Roles', entity: 'roles', action: ActionCrud.list } as RouteDataPermission,
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RoleRoutingModule { }