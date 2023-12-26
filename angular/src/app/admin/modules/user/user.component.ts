import { Component } from '@angular/core';
import {
  UserResponse,
  UserResponseData,
  UserResponseMeta,
} from './interfaces/user.interface';
import { BaseComponent } from '../base/base.component';
import { UserService } from './services/user.service';
import { FormComponent } from '../base/helpers/form/form.component';
import { CommonModule } from '@angular/common';
import { ListComponent } from '@adminModule/base/helpers/list/list.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    ListComponent,
  ],
  styles: [''],
  templateUrl: './user.component.html'
})
export class UserComponent extends BaseComponent<
  UserResponse,
  UserResponseData,
  UserResponseMeta
> {
  constructor(
    protected userService: UserService,
  ) {
    super(userService);
  }
}
