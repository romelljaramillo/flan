import { Injectable } from '@angular/core';
import { BaseService } from '@adminModule/base/services/base.service';
import { LangResponse } from '../interfaces/lang.interface';

@Injectable({
  providedIn: 'root'
})
export class LangService extends BaseService<LangResponse> {
  override url = 'langs';
  override entity = 'langs';
}