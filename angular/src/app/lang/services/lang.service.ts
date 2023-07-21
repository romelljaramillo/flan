import { Injectable } from '@angular/core';

import { BaseService } from 'src/app/base/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class LangService extends BaseService {
  override init() {
    this.url = 'langs';
    this.entity = 'langs';
  }
}