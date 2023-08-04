import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {

  override init() {
    this.url = 'roles';
    this.entity = 'roles';
  }
}
