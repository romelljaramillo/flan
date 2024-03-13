import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

import { FormService } from './services/form.service';
import { FormDefaultComponent } from './default/form-default.component';
import { FormModalComponent } from './modal/form-modal.component';
import { FieldModel } from './fields/field-model';
import { BaseAttribute } from '@core/interfaces/base.interface';
import { FieldsComponent } from './fields/fields.component';

export enum TypeForm {
  default = 'default',
  modal = 'modal',
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [IonIcon, CommonModule, FieldsComponent, ReactiveFormsModule, IonButton, IonContent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent<A extends BaseAttribute>
  implements OnInit, OnChanges, OnDestroy
{
  @Input() typeForm: TypeForm = TypeForm.default;
  @Input() isActive: boolean = false;
  @Input() activeBtnClose: boolean = true;
  @Input() data: A | undefined;
  @Input() fields!: FieldModel<string>[];
  @Output() submitAction = new EventEmitter<A>();

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
        this.removeComponent();
      }
    });
  }

  ngOnChanges(): void {
    this.isActive ? this.activeForm() : this.removeComponent();
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

  private renderForm(): void {
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
        this.componentRef.instance.activeBtnClose = this.activeBtnClose;
        break;
    }

    this.componentRef.instance.formSubmit.subscribe((dataForm: A) => {
      this.submitAction.emit(dataForm);
    });
  }

  private removeComponent() {
    if (this.componentRef) {
      setTimeout(() => {
        this.componentRef.destroy();
        this.btnNew = true;
      }, 300);
    }
  }

  ngOnDestroy() {
    this.subscActiveForm?.unsubscribe();

    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
