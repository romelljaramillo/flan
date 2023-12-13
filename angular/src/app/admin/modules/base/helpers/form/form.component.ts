import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { FormService } from './services/form.service';
import { BaseResponseData } from '../../interfaces/base.interface';
import { FormDefaultComponent } from './form-default.component';
import { FormModalsComponent } from './form-modals.component';
import { FormStaticComponent } from './form-static.component';
import { FieldModel } from './fields/field-model';
import { FormFieldsComponent } from './fields/form-fields.component';

export enum TypeForm {
  default = 'default',
  static = 'static',
  modal = 'modal',
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormFieldsComponent, ReactiveFormsModule],
  styles: [''],
  template: `<div class="text-right">
      @if (btnNew && typeForm == 'modal') {
      <button
        type="button"
        class="btn btn-primary btn-sm mb-2 "
        title="crear nuevo"
        data-toggle="modal"
        data-target="#form"
        (click)="onActiveForm()"
      >
        Nuevo
        <i class="fas fa-plus"></i>
      </button>
      } @else {
      <button
        type="button"
        class="btn btn-primary btn-sm mb-2 "
        title="crear nuevo"
        (click)="onActiveForm()"
      >
        Nuevo
        <i class="fas fa-plus"></i>
      </button>
      }
    </div>
    <ng-template appInsertForm></ng-template>`,
})
export class FormComponent<T extends BaseResponseData>
  implements OnInit, OnChanges
{
  @Input() typeForm: TypeForm = TypeForm.default;
  @Input() isActive: boolean = false;
  @Input() data: T | undefined;
  @Input() dataAttibute: any = {};
  @Input() fields!: FieldModel<string>[];
  @Output() submitAction = new EventEmitter<T>();

  public btnNew: boolean = true;

  public form!: FormGroup;
  componentRef!: ComponentRef<FormModalsComponent | FormDefaultComponent>;

  private subscActiveForm?: Subscription;
  private subscPostForm?: Subscription;

  constructor(
    public formService: FormService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.loadForm();
    this.subscPostForm = this.formService.postForm.subscribe((dataForm) => {
      if (dataForm) {
        this.onSubmitAction(dataForm);
      }
    });
  }

  onSubmitAction(dataForm: T) {
    this.submitAction.emit(dataForm);
  }

  ngOnChanges() {
    if (this.isActive && this.fields && this.data?.attribute) {
      this.dataAttibute = this.data.attribute;
      this.formService.getForm(this.fields, this.dataAttibute);
    } else if (this.isActive && this.fields) {
      this.formService.getForm(this.fields, []);
    }
  }

  loadForm() {
    // const viewContainerRef = this.viewContainerRef;
    this.viewContainerRef.clear();
    switch (this.typeForm) {
      case TypeForm.modal:
        this.viewContainerRef.createComponent(FormModalsComponent);
        break;
      case TypeForm.static:
        this.btnNew = false;
        this.viewContainerRef.createComponent(FormStaticComponent);
        break;
      default:
        this.viewContainerRef.createComponent(FormDefaultComponent);
        break;
    }
  }

  onActiveForm() {
    this.formService.getForm(this.fields, []);
  }

  ngOnDestroy() {
    this.subscActiveForm?.unsubscribe();
    this.subscPostForm?.unsubscribe();
  }
}
