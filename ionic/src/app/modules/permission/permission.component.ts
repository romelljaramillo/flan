import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  PermissionResponse,
  PermissionResponseData,
  PermissionResponseMeta,
} from './interfaces/permission.interface';
import { BaseComponent } from '../base/base.component';
import { PermissionService } from './services/permission.service';
import { FormComponent } from '@adminModule/base/helpers/form/form.component';
import { ListComponent } from '@adminModule/base/helpers/list/list.component';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    ListComponent
  ],
  styles: [''],
  templateUrl: './permission.component.html',  
})
export class PermissionComponent extends BaseComponent<
  PermissionResponse,
  PermissionResponseData,
  PermissionResponseMeta
> {
  constructor(
    protected permissionService: PermissionService,
  ) {
    super(permissionService);
  }
}
