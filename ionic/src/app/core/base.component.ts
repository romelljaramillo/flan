import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import {
  BaseResponse,
  BaseResponseData,
  BaseResponseMeta,
} from './interfaces/base.interface';
import { BaseService } from './services/base.service';
import { AuthService } from '@auth/auth.service';
import { NotificationService } from '@shared/services/notification.service';
import { PermissionData } from '@modules/permission/interfaces/permission.interface';
import { TypeForm } from '@shared/components/form/form.component';
import {
  FieldList,
  OptionsQuery,
} from '@shared/components/list/interfaces/list.interface';
import { FieldModel } from '@shared/components/form/fields';
import { FormService } from '@shared/components/form/services/form.service';
import {
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
  IonSpinner,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [IonSpinner, IonLabel, IonItem, IonRow, IonGrid, CommonModule],
  providers: [AuthService, NotificationService],
  styles: [''],
  templateUrl: './base.component.html',
})
export class BaseComponent<
  T extends BaseResponse,
  D extends BaseResponseData,
  M extends BaseResponseMeta
> implements OnInit
{
  protected formSubscription?: Subscription;
  protected formPostSubscription?: Subscription;
  public permission: PermissionData = { hasPermission: false };
  public typeForm: TypeForm = TypeForm.modal;
  public isFormActive: boolean = false;
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

  public items!: D[];
  public item!: D;
  public meta: M = {
    current_page: 1,
    from: 0,
    last_page: 1,
    links: undefined,
    path: '',
    per_page: 10,
    to: 0,
    total: 0,
  } as unknown as M;

  public fieldsList!: FieldList[];
  public fieldsForm!: FieldModel<string>[];
  public editable: boolean = false;
  public deletable: boolean = false;

  protected authService = inject(AuthService);
  protected notificationService = inject(NotificationService);
  protected formService = inject(FormService);

  constructor(private baseService: BaseService<T>) {}

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
      this.isLoading = false;

      if (response.data && response.data instanceof Array) {
        this.items = response.data as unknown as D[];

        if (response.meta) {
          this.meta = response.meta as unknown as M;
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

  getFieldsForm() {
    this.baseService.getFieldsForm().subscribe((fields) => {
      this.fieldsForm = fields;
    });
  }

  add(data: D) {
    this.baseService.create(data).subscribe((response) => {
      this.notificationService?.success('Se ha creado con éxito.');
      this.activeForm(false);
      this.getAll();
    });
  }

  update(data: D) {
    if (!data.id) return;
    this.baseService.update(data.id, data).subscribe((response) => {
      this.notificationService?.success('Actualización exitosa.');
      this.activeForm(false);
      this.getAll();
    });
  }

  activeForm(isActive: boolean = false) {
    this.isFormActive = isActive;
    this.formService.activeForm.emit(isActive);
  }

  onSubmitAction(data: D) {
    if (!data) return;
    if (data.id && data.id.trim() !== '') {
      this.update(data);
    } else {
      this.add(data);
    }
  }

  onFilter(filters: OptionsQuery) {
    this.filters = filters;
    this.getAll();
  }

  onEdit(item: D) {
    if (!item.id) return;
    this.baseService.getById(item.id).subscribe((response) => {
      console.log(response.data);

      if (response.data && !(response.data instanceof Array)) {
        this.item = response.data.attribute as unknown as D;
        this.activeForm(true);
      }
    });
  }

  onDelete(item: D) {
    if (!item.id) return;
    this.baseService.delete(item.id).subscribe((response) => {
      if (response) {
        this.notificationService?.success('Se ha eliminado con éxito.');
        this.getAll();
      }
    });
  }
}
