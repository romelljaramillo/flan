import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { SiteAttribute, SiteResponse, SiteResponseData } from '../interfaces/site.interface';

@Injectable({
  providedIn: 'root'
})
export class SiteService extends BaseService<SiteResponse, SiteResponseData, SiteAttribute> {
  override url = 'sites';
  override entity = 'sites';
}