import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LangResponse,
  LangResponseData,
  LangResponseMeta,
} from './interfaces/lang.interface';
import { BaseComponent } from '../base/base.component';
import { LangService } from './services/lang.service';
import { FormComponent } from '@adminModule/base/helpers/form/form.component';
import { ListComponent } from '@adminModule/base/helpers/list/list.component';

@Component({
  selector: 'app-lang',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    ListComponent
  ],
  styles: [''],
  templateUrl: './lang.component.html',
})
export class LangComponent extends BaseComponent<
  LangResponse,
  LangResponseData,
  LangResponseMeta
> {
  constructor(
    protected langService: LangService,
  ) {
    super(langService);
  }
}
