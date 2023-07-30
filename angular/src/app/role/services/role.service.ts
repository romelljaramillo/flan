import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseService } from 'src/app/base/services/base.service';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {

  override init() {
    this.url = 'roles';
    this.entity = 'roles';
  }
}
