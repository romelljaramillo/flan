import { Component } from '@angular/core';

import { SiteAttribute, SiteResponseData } from './interfaces/site.interface';

import { SiteService } from './services/site.service';

import { BaseComponent } from '../base/base.component';
import { ListService } from '../base/helpers/list/services/list.service';
import { FormService } from '../base/helpers/form/services/form.service';
import { RoleService } from '../role/services/role.service';


@Component({
  selector: 'app-site',
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
export class SiteComponent extends BaseComponent {
  override data: SiteResponseData[] = [];
  override items: Array<SiteAttribute> = [];

  constructor(
    public siteService: SiteService,
    public override roleService: RoleService,
    public override listService: ListService,
    public override formService: FormService
  ) {
    super(siteService, roleService, listService, formService);
  }
}
