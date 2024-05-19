import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import {
  BaseAttribute,
  BaseResponse,
  BaseResponseData,
  BaseResponseMeta,
} from "./interfaces/base.interface";
import { BaseService } from "./services/base.service";
import { AuthService } from "@modules/auth/auth.service";
import { NotificationService } from "@shared/services/notification.service";
import { PermissionData } from "@modules/permission/interfaces/permission.interface";
import { TypeForm } from "@shared/components/form/form.component";
import {
  FieldList,
  OptionsQuery,
} from "@shared/components/list/interfaces/list.interface";
import { FieldModel } from "@shared/components/form/fields";
import { FormService } from "@shared/components/form/services/form.service";
import {
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
  IonSpinner,
  MenuController,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-base",
  standalone: true,
  imports: [IonSpinner, IonLabel, IonItem, IonRow, IonGrid, CommonModule],
  providers: [AuthService, NotificationService],
  styles: [""],
  templateUrl: "./base.component.html",
})
export class BaseComponent<A extends BaseAttribute> implements OnInit, OnDestroy {
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
    orderBy: "DESC",
    column: "id",
    filter: "",
    filterAdvance: [],
  };

  public items!: BaseResponseData[];
  public item!: A;
  public meta: BaseResponseMeta = {
    current_page: 1,
    from: 0,
    last_page: 1,
    links: undefined,
    path: "",
    per_page: 10,
    to: 0,
    total: 0,
  };

  public fieldsList!: FieldList[];
  public fieldsForm!: FieldModel<string>[];
  public editable: boolean = false;
  public deletable: boolean = false;

  protected router = inject(Router);
  private menuCtrl = inject(MenuController);
  protected authService = inject(AuthService);
  protected notificationService = inject(NotificationService);
  protected formService = inject(FormService);

  subSaveEvent: Subscription;

  constructor(private baseService: BaseService<A>) {
    this.subSaveEvent = this.baseService.saveEvent.subscribe(event => {
      if(event) {
        this.getAll();
      }
    }); 
  }

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
        this.items = response.data as unknown as BaseResponseData[];

        if (response.meta) {
          this.meta = response.meta as unknown as BaseResponseMeta;
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

  add(data: A) {
    this.baseService.create(data).subscribe((response) => {
      this.notificationService?.success("Se ha creado con éxito.");
      this.activeForm(false);
      this.getAll();
    });
  }

  update(data: A) {
    if (!data.id) return;

    const differences = this.getDifferences(this.item, data);

    this.baseService.update(data.id, differences).subscribe((response) => {
      this.notificationService?.success("Actualización exitosa.");
      this.activeForm(false);
      this.getAll();
    });
  }

  getDifferences(data: any, dataForm: any): any {
    const differences: any = {};

    Object.keys(dataForm).forEach((key) => {
      if (data.hasOwnProperty(key) && data[key] !== dataForm[key]) {
        differences[key] = dataForm[key];
      }
    });

    return differences;
  }

  activeForm(isActive: boolean = false) {
    this.isFormActive = isActive;
    this.formService.activeForm.emit(isActive);
  }

  onSubmitAction(data: A) {
    if (!data) return;
    if (data.id && data.id.trim()) {
      this.update(data);
    } else {
      this.add(data);
    }
  }

  onFilter(filters: OptionsQuery) {
    this.filters = filters;
    this.getAll();
  }

  onAdd() {
    this.item = {} as A;

    this.openMenu();
    this.router.navigate([`/admin/${this.baseService.entity}/add`]);
  }

  /* onEdit(item: A) {
    if (!item.id) return;
    this.baseService.getById(item.id).subscribe((response) => {
      if (response.data && !(response.data instanceof Array)) {
        this.item = response.data.attribute as unknown as A;
        this.activeForm(true);
      }
    });
  } */

  onEdit(item: A) {
    this.openMenu();
    if (!item.id) return;
    this.router.navigate([`/admin/${this.baseService.entity}/edit/`, item.id]);
  }

  onDelete(item: BaseResponseData) {
    if (!item.id) return;
    this.baseService.delete(item.id).subscribe((response) => {
      if (response) {
        this.notificationService?.success("Se ha eliminado con éxito.");
        this.getAll();
      }
    });
  }

  updateList() {
    this.router.navigate([`/admin/${this.baseService.entity}`]);
    this.getAll();
  }

  openMenu() {
    this.menuCtrl.open(this.baseService.entity);
  }

  closeMenu() {
    this.menuCtrl.close(this.baseService.entity);
  }

  ngOnDestroy() {
    this.subSaveEvent.unsubscribe();
  }
}
