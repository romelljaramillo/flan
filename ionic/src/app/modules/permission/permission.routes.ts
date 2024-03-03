import { Routes } from '@angular/router';

import { PermissionComponent } from './permission.component';
import { ActionCrud, RouteDataPermission } from './interfaces/permission.interface';

export const routes: Routes = [
  {
    path: '',
    component: PermissionComponent,
    data: { title: 'Permissions', entity: 'permissions', action: ActionCrud.list } as RouteDataPermission,
  }
]