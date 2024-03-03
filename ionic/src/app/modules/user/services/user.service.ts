import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { UserResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserResponse> {
  override url = 'users';
  override entity = 'users';
}
