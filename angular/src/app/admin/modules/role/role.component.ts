import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  RoleResponse,
  RoleResponseData,
  RoleResponseMeta,
} from './interfaces/role.interface';
import { BaseComponent } from '../base/base.component';
import { RoleService } from './services/role.service';
import { FormComponent } from '@adminModule/base/helpers/form/form.component';
import { ListComponent } from '@adminModule/base/helpers/list/list.component';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    ListComponent
  ],
  styles: [''],
  templateUrl: './role.component.html',
  
})
export class RoleComponent extends BaseComponent<
  RoleResponse,
  RoleResponseData,
  RoleResponseMeta
> {
  constructor(
    protected roleService: RoleService,
  ) {
    super(roleService);
  }
}
