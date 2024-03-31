import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { UserAttribute } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserAttribute> {
  override url = 'users';
  override entity = 'users';
}
