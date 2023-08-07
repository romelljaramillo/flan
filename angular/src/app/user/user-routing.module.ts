import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { ActionCrud, RouteDataPermission } from '../permission/interfaces/permission.interface';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: { title: 'Users', entity: 'users', action: ActionCrud.list } as RouteDataPermission,
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { }