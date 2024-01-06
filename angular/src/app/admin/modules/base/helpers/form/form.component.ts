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
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { FormService } from './services/form.service';
import { BaseResponseData } from '../../interfaces/base.interface';
import { FormDefaultComponent } from './form-default.component';
import { FormModalsComponent } from './form-modals.component';
import { FieldModel } from './fields/field-model';
import { FormFieldsComponent } from './fields/form-fields.component';

export enum TypeForm {
  default = 'default',
  modal = 'modal',
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormFieldsComponent, ReactiveFormsModule],
  styles: [''],
  template: `<div class="text-right">
      @if (btnNew && typeForm === 'modal') {
      <button
        type="button"
        class="btn btn-primary btn-sm mb-2 "
        title="crear nuevo"
        (click)="activeForm(true)"
      >
        Nuevo
        <i class="fas fa-plus"></i>
      </button>
      } @else if(btnNew) {
      <button
        type="button"
        class="btn btn-primary btn-sm mb-2 "
        title="crear nuevo"
        (click)="activeForm(true)"
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
  @Input() fields!: FieldModel<string>[];
  @Output() submitAction = new EventEmitter<T>();

  public btnNew: boolean = true;
  componentRef!: ComponentRef<FormModalsComponent | FormDefaultComponent>;

  private subscActiveForm?: Subscription;

  constructor(
    public formService: FormService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this.subscActiveForm = this.formService.activeForm.subscribe((active) => {
      if (!active) {
        this.removerComponente();
      }
    });
  }

  onSubmitAction(dataForm: T) {
    this.submitAction.emit(dataForm);
  }

  ngOnChanges() {
    if (this.isActive) {
      this.activeForm();
      return;
    }
      
    this.removerComponente();
  }

  activeForm(newItem: boolean = false) {
    this.btnNew = false;
    if (newItem) {
      this.data = undefined;
      this.isActive = true;
    }
    this.formService.getForm(this.fields, this.data).subscribe((fields) => {
      this.fields = fields;
      this.renderForm();
    });
  }

  renderForm() {
    this.viewContainerRef.clear();
    switch (this.typeForm) {
      case TypeForm.modal:
        this.componentRef =
        this.viewContainerRef.createComponent(FormModalsComponent);
        this.componentRef.instance.fields = this.fields;
        (this.componentRef.instance as FormModalsComponent).open();
        break;
      default:
        this.componentRef =
        this.viewContainerRef.createComponent(FormDefaultComponent);
        this.componentRef.instance.fields = this.fields;
        break;
    }

    this.componentRef.instance.formSubmit.subscribe((dataForm: T) => {
      this.onSubmitAction(dataForm);
    });
  }

  removerComponente() {
    if(this.componentRef) {
      this.componentRef.instance.animateForm = false;
      
      setTimeout(() => {
        this.componentRef.destroy();
        this.btnNew = true;
      }, 300); 
    }
  }

  ngOnDestroy() {
    this.subscActiveForm?.unsubscribe();
  }
}
