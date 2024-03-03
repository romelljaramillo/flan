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

import { IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

import { FormService } from './services/form.service';
import { FormDefaultComponent } from './form-default.component';
import { FormModalComponent } from './modal/form-modal.component';
import { FieldModel } from './fields/field-model';
import { BaseResponseData } from '@core/interfaces/base.interface';
import { FieldsComponent } from './fields/fields.component';

export enum TypeForm {
  default = 'default',
  modal = 'modal',
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FieldsComponent, ReactiveFormsModule, IonButton],
  styles: [''],
  template: `
      @if (btnNew) {
      <ion-button slot="end" fill="clear" id="open-form" (click)="activeForm(true)">
        <!-- <ion-icon slot="start" name="add-outline"></ion-icon> -->
        Nuevo
      </ion-button>
      }
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
  componentRef!: ComponentRef<FormModalComponent | FormDefaultComponent>;

  private subscActiveForm?: Subscription;

  constructor(
    public formService: FormService,
    private viewContainerRef: ViewContainerRef
  ) {
    addIcons({ addOutline });
  }

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
          this.viewContainerRef.createComponent(FormModalComponent);
        this.componentRef.instance.fields = this.fields;
        (this.componentRef.instance as FormModalComponent).open();
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
    if (this.componentRef) {
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
