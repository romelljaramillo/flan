import { Injectable } from '@angular/core';
import { BaseService } from '@adminModule/base/services/base.service';
import { UserResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserResponse> {
  override url = 'users';
  override entity = 'users';
}
