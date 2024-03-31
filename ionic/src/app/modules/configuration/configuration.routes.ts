import { Routes } from '@angular/router';

import { ConfigurationPage } from './configuration.page';
import { ActionCrud, RouteDataPermission } from '@modules/permission/interfaces/permission.interface';
import { AuthGuard } from '@modules/auth/auth.guard';

export const routesConfigurations: Routes = [
  {
    path: '',
    component: ConfigurationPage,
    data: { title: 'Configurations', entity: 'configurations', action: ActionCrud.list } as RouteDataPermission,
    canLoad: [AuthGuard],
  }
]
