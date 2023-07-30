import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { PermissionGuard } from 'src/app/permission/guards/permission.guard';
import { SiteComponent } from './site.component';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    data: { title: 'Sites', entity: 'sites' },
    canActivate: [AuthGuard, PermissionGuard],
    canLoad: [AuthGuard, PermissionGuard],
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SiteRoutingModule { }