import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SiteComponent } from './site.component';
import { ActionCrud, RouteDataPermission } from '../permission/interfaces/permission.interface';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    data: { title: 'Sites', entity: 'sites', action: ActionCrud.list } as RouteDataPermission,
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SiteRoutingModule { }