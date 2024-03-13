import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { RoleAttribute, RoleResponse, RoleResponseData } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<RoleResponse, RoleResponseData, RoleAttribute> {
  override entity = 'roles';
  override url = 'roles';
}
