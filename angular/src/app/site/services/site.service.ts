import { Injectable } from '@angular/core';

import { BaseService } from 'src/app/base/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class SiteService extends BaseService {
  override init() {
    this.url = 'sites';
    this.entity = 'sites';
  }
}