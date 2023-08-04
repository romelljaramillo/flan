import { Component } from '@angular/core';

import { SiteAttribute, SiteResponseData } from './interfaces/site.interface';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-site',
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
export class SiteComponent extends BaseComponent {
  override data: SiteResponseData[] = [];
  override items: Array<SiteAttribute> = [];
  override url = 'sites';
  override entity = 'sites';
}
