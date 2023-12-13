import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ActionCrud } from '../permission/interfaces/permission.interface';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'Dashboard', entity: 'dashboard', action:  ActionCrud.list},
  }
]
