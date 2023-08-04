import { Component } from '@angular/core';

import { LangAttribute, LangResponseData } from './interfaces/lang.interface';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-lang',
  styles: [''],
  template: `<div class="row">
    <div *ngIf="isLoading" class="text-center">
      <i class="fas fa-spinner fa-pulse"></i>
    </div>
    <div class="col-12">
      <app-form [typeForm]="typeForm"></app-form>
    </div>
    <div class="col-12">
      <app-list></app-list>
    </div>
  </div>`,
})
export class LangComponent extends BaseComponent {
  override data: LangResponseData[] = [];
  override items: Array<LangAttribute> = [];
  override url = 'langs';
  override entity = 'langs';
}
