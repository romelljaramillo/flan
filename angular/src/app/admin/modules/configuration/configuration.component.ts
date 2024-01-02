import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ConfigurationResponse,
  ConfigurationResponseData,
  ConfigurationResponseMeta,
} from './interfaces/configuration.interface';
import { BaseComponent } from '../base/base.component';
import { ConfigurationService } from './services/configuration.service';
import { FormComponent, TypeForm } from '../base/helpers/form/form.component';
import { ListComponent } from '@adminModule/base/helpers/list/list.component';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    ListComponent
  ],
  styles: [''],
  templateUrl: './configuration.component.html',  
})
export class ConfigurationComponent extends BaseComponent<
  ConfigurationResponse,
  ConfigurationResponseData,
  ConfigurationResponseMeta
> {
  constructor(
    protected configurationService: ConfigurationService,
  ) {
    super(configurationService);
    this.typeForm = TypeForm.default;
    this.isFormActive = true;
  }
}
