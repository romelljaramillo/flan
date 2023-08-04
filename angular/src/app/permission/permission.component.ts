import { Component } from '@angular/core';

import { PermissionAttribute, PermissionResponseData } from './interfaces/permission.interface';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-permission',
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
export class PermissionComponent extends BaseComponent {
  override data: PermissionResponseData[] = [];
  override items: Array<PermissionAttribute> = [];

  override url = 'permissions';
  override entity = 'permissions';

  // override init() {
  //   this.url = 'permissions';
  //   this.entity = 'permissions';
  // }
}
