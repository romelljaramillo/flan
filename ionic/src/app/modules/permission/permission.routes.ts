import { Routes } from '@angular/router';

import { PermissionPage } from './permission.page';
import { ActionCrud, RouteDataPermission } from './interfaces/permission.interface';
import { AuthGuard } from '@modules/auth/auth.guard';

export const routesPermissions: Routes = [
  {
    path: '',
    component: PermissionPage,
    data: { title: 'Permissions', entity: 'permissions', action: ActionCrud.list } as RouteDataPermission,
    canLoad: [AuthGuard],
  }
]