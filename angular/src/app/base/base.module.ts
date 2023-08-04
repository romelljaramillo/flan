import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { HelpersModule } from './helpers/helpers.module';

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
  ]
})
export class BaseModule { }
