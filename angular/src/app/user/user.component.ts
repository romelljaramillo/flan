import { Component } from '@angular/core';
import {
  UserResponse,
  UserResponseData,
  UserResponseMeta,
} from './interfaces/user.interface';
import { BaseComponent } from '../base/base.component';
import { UserService } from './services/user.service';
import { AuthService } from '../auth/services/auth.service';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
  selector: 'app-user',
  styles: [''],
  template: `<div class="row">
    <div *ngIf="isLoading" class="text-center">
      <i class="fas fa-spinner fa-pulse"></i>
    </div>
    <div class="col-12">
      <app-form
        [typeForm]="typeForm"
        [data]="item"
        [fields]="fieldsForm"
        [isActive]="isFormActive"
        (submitAction)="onSubmitAction($event)"
      >
      </app-form>
    </div>
    <div class="col-12">
      <app-list
        [fields]="fieldsList"
        [deletable]="deletable"
        [editable]="editable"
        [items]="items"
        [total]="total"
        (edit)="onEdit($event)"
        (delete)="onDelete($event)"
        (filter)="onFilter($event)"
      >
      </app-list>
    </div>
  </div>`,
})
export class UserComponent extends BaseComponent<
  UserResponse,
  UserResponseData,
  UserResponseMeta
> {
  constructor(
    protected userService: UserService,
    protected override authService: AuthService,
    protected override notificationService?: NotificationService
  ) {
    super(userService, authService, notificationService);
  }
}
