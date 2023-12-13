import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteResponse, SiteResponseData, SiteResponseMeta } from './interfaces/site.interface';
import { BaseComponent } from '../base/base.component';
import { SiteService } from './services/site.service';
import { AuthService } from '../auth/services/auth.service';
import { NotificationService } from '@adminShared/notification/notification.service';
import { FormComponent } from '@adminModule/base/helpers/form/form.component';
import { ListComponent } from '@adminModule/base/helpers/list/list.component';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    ListComponent
  ],
  styles: [''],
  templateUrl: './site.component.html'
})
export class SiteComponent extends BaseComponent<
SiteResponse,
SiteResponseData,
SiteResponseMeta
> {

  constructor(
    protected siteService: SiteService,
  ) { 
    super(siteService);
  }
}
