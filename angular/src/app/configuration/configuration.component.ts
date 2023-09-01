import { Component } from '@angular/core';

import {
  ConfigurationResponse,
  ConfigurationResponseData,
  ConfigurationResponseMeta,
} from './interfaces/configuration.interface';
import { BaseComponent } from '../base/base.component';
import { ConfigurationService } from './services/configuration.service';
import { AuthService } from '../auth/services/auth.service';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
  selector: 'app-configuration',
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
  </div>`,
})
export class ConfigurationComponent extends BaseComponent<
  ConfigurationResponse,
  ConfigurationResponseData,
  ConfigurationResponseMeta
> {
  constructor(
    protected configurationService: ConfigurationService,
    protected override authService: AuthService,
    protected override notificationService?: NotificationService
  ) {
    super(configurationService, authService, notificationService);
  }
}
