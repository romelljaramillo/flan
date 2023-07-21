import { Injectable } from '@angular/core';

import { BaseService } from 'src/app/base/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseService {
  override init() {
    this.url = 'permissions';
    this.entity = 'permissions';
  }
}