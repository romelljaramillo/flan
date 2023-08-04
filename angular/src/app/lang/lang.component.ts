import { Component } from '@angular/core';

import { LangAttribute, LangResponseData } from './interfaces/lang.interface';
import { LangService } from './services/lang.service';
import { BaseComponent } from '../base/base.component';
import { ListService } from '../base/helpers/list/services/list.service';
import { FormService } from '../base/helpers/form/services/form.service';


@Component({
  selector: 'app-lang',
  styles: [''],
  template: `<div class="row">
    <div *ngIf="isLoading" class="text-center">
      <i class="fas fa-spinner fa-pulse"></i>
    </div>
    <div class="col-12">
      <app-form [typeForm]="typeForm"></app-form>
    </div>
    <div class="col-12">
      <app-list></app-list>
    </div>
  </div>`,
})
export class LangComponent extends BaseComponent {
  override data: LangResponseData[] = [];
  override items: Array<LangAttribute> = [];

  constructor(
    public langService: LangService,
    protected override listService: ListService,
    protected override formService: FormService
  ) {
    super(langService, listService, formService);
  }
}
