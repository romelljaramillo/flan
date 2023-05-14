import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DefaultResponse, OptionsQuery } from './interfaces/base.interface';
import { BaseService } from './services/base.service';
import { TypeForm } from './helpers/form/form.component';
import { FieldList } from './helpers/list/interfaces/list.interface';
import { ListService } from './helpers/list/services/list.service';
import { FormService } from './helpers/form/services/form.service';
import { FieldForm } from './helpers/form/interfaces/form.interface';
import { RoleService } from '../role/services/role.service';
import { PermissionsCrud } from '../role/interfaces/role.interface';
import { Alert } from '../shared/alert/alert';

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
  private listSubscription?: Subscription;
  private listSubscriptionDelete?: Subscription;
  private formSubscription?: Subscription;
  private formPostSubscription?: Subscription;
  public permissions: PermissionsCrud = {
    create: false,
    read: false,
    update: false,
    delete: false,
  };
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
    private baseService: BaseService,
    public roleService?: RoleService,
    public listService?: ListService,
    public formService?: FormService
  ) {
    this.listService!.isAdvanceSearch = true;
    this.roleService
      ?.validationPermission(this.baseService.entity)
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
    this.baseService.getAll(this.filters).subscribe((response) => {
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

    this.baseService.getFieldsList().subscribe((response: FieldList[]) => {
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

      Alert.success('Se ha creado con éxito.');

      this.getAll();
    });
  }

  update(data: any) {
    this.baseService.update(data.id, data).subscribe((response) => {
      console.log(response);
      this.formService!.renderForm.emit(false);

      Alert.success('Actualización exitosa.');

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
        Alert.success('Se ha eliminado con éxito.');
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
        Alert.confirm('Está seguro de eliminar?', {
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
    this.formSubscription?.unsubscribe();
    this.formPostSubscription?.unsubscribe();
    this.listSubscriptionDelete?.unsubscribe();
  }
}
