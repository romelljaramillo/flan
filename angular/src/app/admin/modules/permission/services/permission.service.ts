import { Injectable } from '@angular/core';
import { BaseService } from '@adminModule/base/services/base.service';
import { PermissionResponse } from '../interfaces/permission.interface';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseService<PermissionResponse> {
  override url = 'permissions';
  override entity = 'permissions';
}