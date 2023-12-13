
import { Routes } from '@angular/router';

import { PagenofoundComponent } from '@adminShared/errors/page-nofound.component';
import { PageUnauthorizedComponent } from '@adminShared/errors/page-unauthorized.component';
import { AuthRoutes } from '@adminModule/auth/auth.routes';
import { pageRoutes } from './admin/pages/pages.routes';

export const routes: Routes = [
  ...AuthRoutes,
  ...pageRoutes,
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '403-unauthorized', component: PageUnauthorizedComponent },
  { path: '**', component: PagenofoundComponent },
];

