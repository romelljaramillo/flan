import { Injectable } from '@angular/core';
import { BaseService } from '@adminModule/base/services/base.service';
import { ConfigurationResponse } from '../interfaces/configuration.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService extends BaseService<ConfigurationResponse> {
  override url = 'configurations';
  override entity = 'configurations';
}
