import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import { FormService } from './services/form.service';
import { FieldModel } from './fields/field-model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControlService } from './services/form-control.service';
import { CommonModule } from '@angular/common';
import { FieldsComponent } from './fields/fields.component';

@Component({
  selector: 'app-form-default',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FieldsComponent],
  animations: [
    trigger('formAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-10%)' }), // Comienza por encima de la posición final
        animate('300ms ease-out', style({ transform: 'translateY(0)' })) // Desliza hacia la posición final
      ]),
      // Animación de salida: deslizar hacia arriba
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(-10%)' })) // Desliza hacia arriba
      ])
    ])
  ],
  styles: [''],
  template: ` <div @formAnimation class="card card-primary mt-2">
    <form (ngSubmit)="onSubmit()" [formGroup]="form" autocomplete="off">
      <div class="card-header">
        <h3 class="card-title">Formulario</h3>
        <button
          #Modal
          type="button"
          class="close"
          aria-label="Close"
        >
          <span aria-hidden="true" (click)="close()">×</span>
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
              (click)="close()"
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
  @Output() formSubmit = new EventEmitter<any[]>();
  @HostBinding('@formAnimation') animateForm = true;

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
