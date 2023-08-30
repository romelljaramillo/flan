import { Component, OnInit, Optional } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  BaseAttribute,
  BaseResponse,
  BaseResponseData,
  BaseResponseMeta,
} from './interfaces/base.interface';
import { BaseService } from './services/base.service';
import { TypeForm } from './helpers/form/form.component';
import {
  FieldList,
  OptionsQuery,
} from './helpers/list/interfaces/list.interface';
import { PermissionData } from '../permission/interfaces/permission.interface';
import { NotificationService } from '../shared/notification/notification.service';
import { AuthService } from '../auth/services/auth.service';
import { FieldModel } from './helpers/form/fields';

@Component({
  selector: 'app-base',
  styles: [''],
  template: `<div class="row">
    <div class="col-12">
      <div *ngIf="isLoading" class="text-center">
        <i class="fas fa-spinner fa-pulse"></i>
      </div>
    </div>
  </div>`,
})
export class BaseComponent implements OnInit {
  protected formSubscription?: Subscription;
  protected formPostSubscription?: Subscription;
  public permission: PermissionData = { hasPermission: false };
  public typeForm: TypeForm = TypeForm.modal;
  public isLoading: boolean = false;

  public total: number = 0;
  public filters: OptionsQuery = {
    perPage: 10,
    page: 1,
    orderBy: 'DESC',
    column: 'id',
    filter: '',
    filterAdvance: [],
  };

  public items!: BaseResponseData[];
  public item!: BaseResponseData;
  public meta: BaseResponseMeta = {
    current_page: 1,
    from: 0,
    last_page: 1,
    links: undefined,
    path: '',
    per_page: 10,
    to: 0,
    total: 0,
  };
  public fieldsList!: FieldList[];
  public fieldsForm!: FieldModel<string>[];
  public editable: boolean = false;
  public deletable: boolean = false;
  public isFormActive: boolean = false;

  constructor(
    protected baseService: BaseService<BaseResponse>,
    protected authService: AuthService,
    @Optional() protected notificationService?: NotificationService
  ) {}

  ngOnInit(): void {
    this.authService.entity = this.baseService.entity;
    if (this.baseService.url) {
      this.getAll();
      this.getFieldsForm();
    }
  }

  getAll(): void {
    this.isLoading = true;
    this.baseService.getAll(this.filters).subscribe((response) => {
      // console.log('getAll ' , response);
      this.isLoading = false;
      if (response.data && response.data instanceof Array) {
        this.items = response.data;
        if (response.meta) {
          this.meta = response.meta;
        }
        this.getList();
      }
    });
  }

  getList() {
    if (this.meta) {
      this.filters.perPage = this.meta.per_page ?? this.filters.perPage;
      this.filters.page = this.meta.current_page ?? this.filters.page;
      this.total = this.meta.total ?? this.total;
    }

    this.baseService.getFieldsList().subscribe((response) => {
      this.fieldsList = response.data.fields;
      this.editable = response.data.editable;
      this.deletable = response.data.deletable;
    });
  }

  add(data: BaseAttribute) {
    this.baseService.create(data).subscribe((response) => {
      this.notificationService?.success('Se ha creado con éxito.');
      this.getAll();
    });
  }

  update(data: BaseAttribute) {
    if(!data.id) return;
    this.baseService.update(data.id, data).subscribe((response) => {
      this.notificationService?.success('Actualización exitosa.');
      this.getAll();
    });
  }

  onSubmitAction(data: BaseAttribute) {
    if (!data) return;
    if (data.id) {
      this.update(data);
    } else {
      this.add(data);
    }
  }

  onFilter(filters: OptionsQuery) {
    this.filters = filters;
    this.getAll();
  }

  onEdit(item: BaseResponseData) {
    if (!item.id) return;
    this.baseService.getById(item.id).subscribe((response) => {
      if (response.data && !(response.data instanceof Array)) {
        this.item = response.data;
        this.isFormActive = true;
      }
    });
  }

  getFieldsForm() {
    this.baseService.getFieldsForm().subscribe((response) => {
      this.fieldsForm = response;
    });
  }

  onDelete(item: BaseAttribute) {
    if (!item.id) return;

    if(!this.notificationService?.confirm('Está seguro de eliminar?', {
      text: '¡No podrás revertir esto!'})) return;

    this.baseService.delete(item.id).subscribe((response) => {
      if (response) {
        this.notificationService?.success('Se ha eliminado con éxito.');
        this.getAll();
      }
    });
  }

}
