import { Routes } from '@angular/router';

import { LangComponent } from './lang.component';

export const routes: Routes = [
  {
    path: '',
    component: LangComponent,
    data: { title: 'Langs', entity: 'langs' },
  }
]