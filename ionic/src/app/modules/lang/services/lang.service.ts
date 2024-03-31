import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { LangAttribute } from '../interfaces/lang.interface';

@Injectable({
  providedIn: 'root'
})
export class LangService extends BaseService<LangAttribute> {
  override url = 'langs';
  override entity = 'langs';
}