import { Component } from '@angular/core';

import { LangAttribute, LangResponse, LangResponseData, LangResponseLinks, LangResponseMeta } from './interfaces/lang.interface';
import { BaseComponent } from '../base/base.component';
import { LangService } from './services/lang.service';
import { AuthService } from '../auth/services/auth.service';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
  selector: 'app-lang',
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
    </div>`,
})
export class LangComponent extends BaseComponent<
  LangResponse,
  LangResponseData,
  LangResponseMeta
> {

  constructor(
    protected langService: LangService,
    protected override authService: AuthService,
    protected override notificationService?: NotificationService
  ) { 
    super(langService, authService, notificationService);
  }
  
}
