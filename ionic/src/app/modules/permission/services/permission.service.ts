import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { PermissionAttribute, PermissionResponse, PermissionResponseData } from '../interfaces/permission.interface';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseService<PermissionResponse, PermissionResponseData, PermissionAttribute> {
  override url = 'permissions';
  override entity = 'permissions';
}