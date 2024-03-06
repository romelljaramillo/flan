import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { RoleResponse } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<RoleResponse> {
  override entity = 'roles';
  override url = 'roles';
}
