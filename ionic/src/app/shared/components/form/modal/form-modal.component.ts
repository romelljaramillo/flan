import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import {
  IonButton,
  IonModal,
  IonButtons,
  IonContent,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonLabel,
  IonItem,
  IonFooter, IonList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

import { FormService } from '../services/form.service';
import { FieldModel } from '../fields/field-model';
import { FormControlService } from '../services/form-control.service';
import { FieldsComponent } from '../fields/fields.component';

@Component({
  selector: 'app-form-modals',
  standalone: true,
  imports: [IonList, 
    IonFooter,
    IonItem,
    IonLabel,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonContent,
    IonButtons,
    CommonModule,
    ReactiveFormsModule,
    FieldsComponent,
    IonButton,
    IonModal,
  ],
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent implements OnInit, OnDestroy {
  @Input() fields!: FieldModel<string>[];
  @Output() formSubmit = new EventEmitter<any[]>();
  @Input() activeBtnClose: boolean = true;
  
  public form!: FormGroup;
  public showModal: boolean = false;

  constructor(
    private formService: FormService,
    private formControlService: FormControlService
  ) {
    addIcons({ addOutline });
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.form = this.formControlService.toFormGroup(this.fields);
  }

  open() {
    this.showModal = true;
  }

  close() {
    this.showModal = false;
    this.formService!.activeForm.emit(false);
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
    this.showModal = false;
    this.formControlService.processCheckboxFields(values);

    this.formSubmit.emit(values);
  }

  ngOnDestroy() {
    this.formService!.activeForm.emit(false);
  }
}
