import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LangComponent } from './lang.component';

const routes: Routes = [
  {
    path: '',
    component: LangComponent,
    data: { title: 'Langs', entity: 'langs' },
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LangRoutingModule { }