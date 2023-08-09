
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './admin/pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing.module';

import { PagenofoundComponent } from './shared/errors/page-nofound.component';
import { PageUnauthorizedComponent } from './shared/errors/page-unauthorized.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '403-unauthorized', component: PageUnauthorizedComponent },
  { path: '**', component: PagenofoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
