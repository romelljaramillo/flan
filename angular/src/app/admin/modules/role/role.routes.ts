import { Routes } from '@angular/router';

import { RoleComponent } from './role.component';
import { ActionCrud, RouteDataPermission } from '../permission/interfaces/permission.interface';

export const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
    data: { title: 'Roles', entity: 'roles', action: ActionCrud.list } as RouteDataPermission,
  }
]