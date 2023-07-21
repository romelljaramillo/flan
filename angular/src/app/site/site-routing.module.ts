import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { RoleGuard } from 'src/app/role/guards/role.guard';
import { SiteComponent } from './site.component';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    data: { title: 'Sites', entity: 'sites' },
    canActivate: [AuthGuard, RoleGuard],
    canLoad: [AuthGuard, RoleGuard],
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SiteRoutingModule { }