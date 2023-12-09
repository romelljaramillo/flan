import { Component, ComponentRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { FormService } from './services/form.service';
import { BaseResponseData } from '../../interfaces/base.interface';
import { InsertFormDirective } from './insert-form.directive';
import { FormDefaultComponent } from './form-default.component';
import { FormModalsComponent } from './form-modals.component';
import { FormStaticComponent } from './form-static.component';
import { FieldModel } from './fields/field-model';

export enum TypeForm {
  default = 'default',
  static = 'static',
  modal = 'modal',
}

@Component({
  selector: 'app-form',
  styles: [''],
  template: `<div class="text-right">
      <button *ngIf="btnNew"
        type="button"
        class="btn btn-primary btn-sm mb-2 "
        title="crear nuevo"
        data-toggle="modal"
        data-target="#form"
        (click)="onActiveForm()">
        Nuevo
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <ng-template appInsertForm></ng-template>`,
})
export class FormComponent<T extends BaseResponseData> implements OnInit, OnChanges {
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

  @ViewChild(InsertFormDirective, { static: true }) insertForm!: InsertFormDirective;

  constructor(public formService: FormService) {}

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
    if(this.isActive && this.fields && this.data?.attribute){
      this.dataAttibute = this.data.attribute;
      this.formService.getForm(this.fields, this.dataAttibute);
    } else if(this.isActive && this.fields){
      this.formService.getForm(this.fields,[]);
    }
  }

  loadForm() {
    const viewContainerRef = this.insertForm.viewContainerRef;
    viewContainerRef.clear();
    switch (this.typeForm) {
      case TypeForm.modal:
        viewContainerRef.createComponent(FormModalsComponent);
        break;
      case TypeForm.static:
        this.btnNew = false;
        viewContainerRef.createComponent(FormStaticComponent);
        break;
      default:
        viewContainerRef.createComponent(FormDefaultComponent);
        break;
    }
  }

  onActiveForm() {
    this.formService.getForm(this.fields,[]);
  }

  ngOnDestroy() {
    this.subscActiveForm?.unsubscribe();
    this.subscPostForm?.unsubscribe();
  }
}
