import { Routes } from '@angular/router';

import { SiteComponent } from './site.component';
import { ActionCrud, RouteDataPermission } from '../permission/interfaces/permission.interface';

export const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    data: { title: 'Sites', entity: 'sites', action: ActionCrud.list } as RouteDataPermission,
  }
]