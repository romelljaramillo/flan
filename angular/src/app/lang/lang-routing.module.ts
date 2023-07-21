import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { RoleGuard } from 'src/app/role/guards/role.guard';
import { LangComponent } from './lang.component';

const routes: Routes = [
  {
    path: '',
    component: LangComponent,
    data: { title: 'Langs', entity: 'langs' },
    canActivate: [AuthGuard, RoleGuard],
    canLoad: [AuthGuard, RoleGuard],
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LangRoutingModule { }