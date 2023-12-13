import { Routes } from '@angular/router';

import { ConfigurationComponent } from './configuration.component';
import { ActionCrud, RouteDataPermission } from '../permission/interfaces/permission.interface';
import { AuthGuard } from '../auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    data: { title: 'Configurations', entity: 'configurations', action: ActionCrud.list } as RouteDataPermission,
    canLoad: [AuthGuard],
  }
]
