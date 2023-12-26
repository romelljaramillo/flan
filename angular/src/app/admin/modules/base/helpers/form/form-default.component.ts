import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormService } from './services/form.service';
import { FieldModel } from './fields/field-model';
import { Subscription } from 'rxjs';
import { FormControlService } from './services/form-control.service';
import { FormFieldsComponent } from './fields/form-fields.component';

@Component({
  selector: 'app-form-default',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldsComponent],
  styles: [''],
  template: `
    @if (isActiveForm) {
    <div class="card card-primary mt-2">
      <div class="card-header">
        <h3 class="card-title">Formulario</h3>
        <button
          #Modal
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true" (click)="closeForm()">×</span>
        </button>
      </div>
      <div class="card-body">
        <form (ngSubmit)="onSubmit()" [formGroup]="form" autocomplete="off">
          @for (field of fields; track field.key) {
          <div class="form-group">
            <app-form-fields [field]="field" [form]="form">></app-form-fields>
          </div>
          }
          <div class="row mt-3">
            <div class="col-sm-6 text-left">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                (click)="closeForm()"
              >
                cancel
              </button>
            </div>
            <div class="col-sm-6 text-right">
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    }
  `,
})
export class FormDefaultComponent implements OnInit {
  public fields!: FieldModel<string>[];
  public form!: FormGroup;
  private subscActiveForm?: Subscription;
  private subscFieldsForm?: Subscription;
  public isActiveForm: boolean = false;

  constructor(
    private formService: FormService,
    private formControlService: FormControlService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({});
    this.subscActiveForm = this.formService!.activeForm.subscribe((active) => {
      this.isActiveForm = active;
      if (active) {
        this.subscFieldsForm = this.formService.fields.subscribe(
          (fields: FieldModel<string>[]) => {
            this.fields = fields;
            this.form = this.formControlService.toFormGroup(this.fields);
          }
        );
      }
    });
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
    this.formService!.postForm.emit(values);
    this.closeForm();
  }

  closeForm() {
    this.formService!.activeForm.emit(false);
  }

  ngOnDestroy() {
    this.subscActiveForm?.unsubscribe();
    this.subscFieldsForm?.unsubscribe();
  }
}
