import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagenofoundComponent } from './page-nofound.component';
import { RouterModule } from '@angular/router';
import { PageUnauthorizedComponent } from './page-unauthorized.component';

@NgModule({
  declarations: [
    PagenofoundComponent,
    PageUnauthorizedComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ErrorsModule { }
