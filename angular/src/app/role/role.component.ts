import { Component } from '@angular/core';

import { RoleResponseData } from './interfaces/role.interface';
import { BaseComponent } from '../base/base.component';
import { RoleService } from './services/role.service';
import { AuthService } from '../auth/services/auth.service';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
  selector: 'app-role',
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
      (filter)="onFilter($event)">
    </app-list>
  </div>
</div>`
})
export class RoleComponent extends BaseComponent {
  override items: RoleResponseData[] = [];
  override item!: RoleResponseData;
  
  constructor(
    protected roleService: RoleService,
    protected override authService: AuthService,
    protected override notificationService?: NotificationService,
  ) { 
    super(roleService, authService, notificationService);
  }
}
