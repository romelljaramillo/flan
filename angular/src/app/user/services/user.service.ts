import { Injectable, OnInit } from '@angular/core';
import { BaseService } from 'src/app/base/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  override init() {
    this.url = 'users';
    this.entity = 'users';
  }
}
