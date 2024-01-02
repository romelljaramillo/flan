import { Component, Input, OnInit } from '@angular/core';
import { FormService } from './services/form.service';
import { FieldModel } from './fields/field-model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControlService } from './services/form-control.service';
import { CommonModule } from '@angular/common';
import { FormFieldsComponent } from './fields/form-fields.component';

@Component({
  selector: 'app-form-default',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldsComponent],
  styles: [''],
  template: `
    <div class="card card-primary mt-2">
      <form (ngSubmit)="onSubmit()" [formGroup]="form" autocomplete="off">
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
          @for (field of fields; track field.key) {
          <div class="form-group">
            <app-form-fields [field]="field" [form]="form">></app-form-fields>
          </div>
          }
          </div>
          <div class="card-footer">          
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
          </div>
        </form>
    </div>`,
})
export class FormDefaultComponent implements OnInit {
  @Input() fields!: FieldModel<string>[];
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
    this.formService!.postForm.emit(values);
    this.closeForm();
  }

  closeForm() {
    this.formService!.activeForm.emit(false);
  }
}
