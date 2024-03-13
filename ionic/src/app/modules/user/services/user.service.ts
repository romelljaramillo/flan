import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { UserAttribute, UserResponse, UserResponseData } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserResponse, UserResponseData, UserAttribute> {
  override url = 'users';
  override entity = 'users';
}
