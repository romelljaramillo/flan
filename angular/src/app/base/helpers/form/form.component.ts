import { Component, ComponentRef, EventEmitter, Input, OnChanges, OnInit, Output, Type, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { FormService } from './services/form.service';
import { FieldForm } from './interfaces/form.interface';
import { BaseResponseData } from '../../interfaces/base.interface';
import { InsertFormDirective } from './insert-form.directive';
import { FormModalsComponent } from './form-modals.component';
import { FormDefaultComponent } from './form-default.component';
import { FieldModel } from './fields/field-model';

export enum TypeForm {
  default = 'default',
  modal = 'modal',
}

@Component({
  selector: 'app-form',
  styles: [''],
  template: `<div class="text-right">
      <button
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
    }
  }

  loadForm() {
    const viewContainerRef = this.insertForm.viewContainerRef;
    viewContainerRef.clear();
    (this.typeForm === TypeForm.modal)
      ? this.componentRef = viewContainerRef.createComponent(FormModalsComponent)
      : this.componentRef = viewContainerRef.createComponent(FormDefaultComponent);
  }

  onActiveForm() {
    this.formService.getForm(this.fields,[]);
  }

  ngOnDestroy() {
    this.subscActiveForm?.unsubscribe();
    this.subscPostForm?.unsubscribe();
  }
}
