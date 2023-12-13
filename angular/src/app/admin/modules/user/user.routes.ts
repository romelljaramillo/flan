import { Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { ActionCrud, RouteDataPermission } from '../permission/interfaces/permission.interface';
import { AuthGuard } from '../auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: { title: 'Users', entity: 'users', action: ActionCrud.list } as RouteDataPermission,
    canLoad: [AuthGuard],
  }
]