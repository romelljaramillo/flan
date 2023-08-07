import { Component } from '@angular/core';

import { RoleAttribute, RoleResponseData } from './interfaces/role.interface';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-role',
  styles: [''],
  template: `<div class="row">
  <div class="col-12">
    <div *ngIf="isLoading" class="text-center">
      <i class="fas fa-spinner fa-pulse"></i>
    </div>
    <div class="col-12">
      <app-form [typeForm]="typeForm"></app-form>
    </div>
    <app-list></app-list>
  </div>
</div>`
})
export class RoleComponent extends BaseComponent {
  override data: RoleResponseData[] = [];
  override items: Array<RoleAttribute> = [];
  override url = 'roles';
  override entity = 'roles';
}
