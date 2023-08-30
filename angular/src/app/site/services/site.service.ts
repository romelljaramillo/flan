import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/services/base.service';
import { SiteResponse } from '../interfaces/site.interface';

@Injectable({
  providedIn: 'root'
})
export class SiteService extends BaseService<SiteResponse> {
  override url = 'sites';
  override entity = 'sites';
}