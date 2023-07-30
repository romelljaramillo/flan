import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { PermissionGuard } from 'src/app/permission/guards/permission.guard';
import { LangComponent } from './lang.component';

const routes: Routes = [
  {
    path: '',
    component: LangComponent,
    data: { title: 'Langs', entity: 'langs' },
    canActivate: [AuthGuard, PermissionGuard],
    canLoad: [AuthGuard, PermissionGuard],
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LangRoutingModule { }