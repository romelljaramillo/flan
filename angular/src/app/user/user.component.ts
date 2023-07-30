import { Component } from '@angular/core';

import { UserAttribute, UserResponseData } from './interfaces/user.interface';

import { UserService } from './services/user.service';

import { BaseComponent } from '../base/base.component';
import { ListService } from '../base/helpers/list/services/list.service';
import { FormService } from '../base/helpers/form/services/form.service';
import { PermissionService } from '../permission/services/permission.service';

@Component({
  selector: 'app-user',
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
export class UserComponent extends BaseComponent {
  override data: UserResponseData[] = [];
  override items: Array<UserAttribute> = [];

  constructor(
    public userService: UserService,
    public override permissionService: PermissionService,
    public override listService: ListService,
    public override formService: FormService
  ) {
    super(userService, permissionService, listService, formService);
  }
}
