import { Component } from '@angular/core';

import { PermissionAttribute, PermissionResponseData } from './interfaces/permission.interface';

import { PermissionService } from './services/permission.service';

import { BaseComponent } from '../base/base.component';
import { ListService } from '../base/helpers/list/services/list.service';
import { FormService } from '../base/helpers/form/services/form.service';
import { RoleService } from '../role/services/role.service';


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

  constructor(
    public permissionService: PermissionService,
    public override roleService: RoleService,
    public override listService: ListService,
    public override formService: FormService
  ) {
    super(permissionService, roleService, listService, formService);
  }
}
