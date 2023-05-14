import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { HelpersModule } from './helpers/helpers.module';
import { AuthService } from '../auth/services/auth.service';

@NgModule({
  declarations: [
    BaseComponent
  ],
  imports: [
    CommonModule,
    HelpersModule
  ],
  exports: [
    HelpersModule
  ],
  providers: [
    AuthService
  ]
})
export class BaseModule { }
