import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import { FormService } from '../services/form.service';
import { FieldModel } from '../fields/field-model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControlService } from '../services/form-control.service';
import { CommonModule } from '@angular/common';
import { FieldsComponent } from '../fields/fields.component';
import { IonCardTitle, IonCard, IonCardHeader, IonCardContent, IonList, IonToolbar, IonButtons, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-form-default',
  standalone: true,
  templateUrl: './form-default.component.html',
  styleUrls: ['./form-default.component.scss'],
  imports: [IonButton, IonButtons, IonToolbar, IonList, IonCardContent, IonCardHeader, IonCard, IonCardTitle, CommonModule, ReactiveFormsModule, FieldsComponent],
})
export class FormDefaultComponent implements OnInit {
  @Input() fields!: FieldModel<string>[];
  @Output() formSubmit = new EventEmitter<any[]>();
  @HostBinding('@formAnimation') animateForm = true;
  @Input() activeBtnClose: boolean = true;

  public form!: FormGroup;

  constructor(
    private formService: FormService,
    private formControlService: FormControlService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({});
    this.form = this.formControlService.toFormGroup(this.fields);
  }

  onSubmit() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    const values = this.form.value;
    this.formControlService.processCheckboxFields(values);
    this.formSubmit.emit(values);
  }

  close() {
    this.formService!.activeForm.emit(false);
  }
}
