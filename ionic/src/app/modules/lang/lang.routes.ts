import { Routes } from '@angular/router';

import { ActionCrud, RouteDataPermission } from '@modules/permission/interfaces/permission.interface';
import { AuthGuard } from '@auth/auth.guard';
import { LangPage } from './lang.page';

export const routesLangs: Routes = [
  {
    path: '',
    component: LangPage,
    data: { title: 'Langs', entity: 'langs', action: ActionCrud.list } as RouteDataPermission,
    canLoad: [AuthGuard],
  }
]