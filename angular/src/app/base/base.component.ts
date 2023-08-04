import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { Subscription } from 'rxjs';

import { DefaultResponse, OptionsQuery } from './interfaces/base.interface';
import { BaseService } from './services/base.service';
import { TypeForm } from './helpers/form/form.component';
import { FieldList } from './helpers/list/interfaces/list.interface';
import { ListService } from './helpers/list/services/list.service';
import { FormService } from './helpers/form/services/form.service';
import { FieldForm } from './helpers/form/interfaces/form.interface';
import { PermissionService } from '../permission/services/permission.service';
import { PermissionsData } from '../permission/interfaces/permission.interface';
import { NotificationService } from '../shared/notification/notification.service';

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
export class BaseComponent implements OnInit, OnDestroy {
  protected listSubscription?: Subscription;
  protected listSubscriptionDelete?: Subscription;
  protected formSubscription?: Subscription;
  protected formPostSubscription?: Subscription;
  public permissions: PermissionsData = {hasPermission: false};
  public typeForm: TypeForm = TypeForm.modal;
  public isLoading: boolean = false;

  // opciones list y paginación
  public total: number = 0;
  public filters: OptionsQuery = {
    perPage: 10,
    page: 1,
    orderBy: 'DESC',
    column: 'id',
    filter: '',
    filterAdvance: [],
  };

  public data: any;
  public fields: FieldList[] = [];
  public items: Array<any> = [];

  constructor(
    protected baseService: BaseService,
    @Optional() protected listService?: ListService,
    @Optional() protected formService?: FormService,
    @Optional() protected notificationService?: NotificationService,
    @Optional() protected permissionService?: PermissionService,
  ) {
    console.log(this.baseService.entity);
    
    this.permissionService
    ?.checkPermission(this.baseService.entity)
    .subscribe((permissions) => {
      this.listService!.permissions = permissions;
      this.formService!.permissions = permissions;
    });

  }

  ngOnInit(): void {
    this.actionsList();
    this.actionsForm();
    this.getAll();
  }

  getAll(): void {
    this.isLoading = true;
    this.baseService.getAll(this.filters)
    .subscribe((response) => {
      this.data = response.data;
      this.filters.perPage = response.meta.per_page;
      this.filters.page = response.meta.current_page;
      this.total = response.meta.total;
      this.isLoading = false;
      this.getList();
    });
  }

  getList() {
    this.items = [];

    this.data.forEach((item: any) => {
      this.items.push(item);
    });

    this.baseService.getFieldsList()
    .subscribe((response: FieldList[]) => {
      this.fields = response;
      this.listService!.data = this.items;
      this.listService!.fields = this.fields;
      this.listService!.total = this.total;
    });
  }

  add(data: any) {
    this.baseService.create(data).subscribe((response) => {
      console.log(response);
      this.formService!.renderForm.emit(false);

      this.notificationService?.success('Se ha creado con éxito.');

      this.getAll();
    });
  }

  update(data: any) {
    this.baseService.update(data.id, data).subscribe((response) => {
      console.log(response);
      this.formService!.renderForm.emit(false);

      this.notificationService?.success('Actualización exitosa.');

      this.getAll();
    });
  }

  edit(id: string) {
    this.baseService.getById(id).subscribe((response: DefaultResponse) => {

      if (response) {
        this.formService!.data = response.data.attribute;
        this.getFieldsForm();
      }
    });
  }

  delete(id: string) {
    this.baseService.delete(id).subscribe((response) => {
      if (response) {
        this.notificationService?.success('Se ha eliminado con éxito.');
        this.getAll();
      }
    });
  }

  getFieldsForm() {
    this.baseService.getFieldsForm().subscribe(
      (fields: FieldForm[]) => {
        this.formService!.getForm(fields);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  actionsList() {
    this.listSubscription = this.listService!.filters.subscribe((filters) => {
      this.filters = filters;
      this.getAll();
    });

    this.listSubscriptionDelete = this.listService!.deleteAction.subscribe(
      (id) => {
        this.notificationService?.confirm('Está seguro de eliminar?', {
          text: '¡No podrás revertir esto!',
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.delete(id);
          }
        });
      }
    );
  }

  actionsForm() {
    this.formSubscription = this.formService!.initForm.subscribe(
      (formActive) => {
        if (formActive.id) {
          this.edit(formActive.id);
        } else if (formActive.active) {
          this.formService!.data = [];
          this.getFieldsForm();
        }
      }
    );

    this.formPostSubscription = this.formService!.postData.subscribe((data) => {
      if (data.id) {
        this.update(data);
      } else {
        this.add(data);
      }
    });
  }

  ngOnDestroy() {
    this.listSubscription?.unsubscribe();
    this.listSubscriptionDelete?.unsubscribe();
    this.formSubscription?.unsubscribe();
    this.formPostSubscription?.unsubscribe();
  }
}
