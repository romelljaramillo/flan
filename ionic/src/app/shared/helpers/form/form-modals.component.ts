import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from './services/form.service';
import { FieldModel } from './fields/field-model';
import { FormControlService } from './services/form-control.service';
import { FormFieldsComponent } from './fields/form-fields.component';

// lib ngx-flan-kit-ux theme
import { BtnComponent } from 'projects/ngx-flan-kit-ux/src/public-api';

@Component({
  selector: 'app-form-modals',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldsComponent,
    BtnComponent
  ],
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
  styles: [`
  :host {
    position: fixed; /* o 'absolute' según tu layout */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1050; /* Un valor alto para asegurarse que esté por encima de otros elementos */
  }
`],
  template: `<div
    class="modal fade"
    id="form-modal"
    aria-labelledby="formLabel"
    [attr.aria-modal]="showModal ? 'true' : null"
    [attr.aria-hidden]="showModal ? null : 'true'"
    [attr.role]="showModal ? 'dialog' : null"
    [class.show]="showModal"
    [style.display]="showModal ? 'block' : 'none'"
  >
    <div @formAnimation class="modal-dialog  modal-lg">
      <div class="modal-content">
        <form (ngSubmit)="onSubmit()" [formGroup]="form" autocomplete="off">
          <div class="modal-header">
            <h4 class="modal-title">formulario</h4>
            <rjb-btn (onClick)="close()" css="close" aria-label="Close">
            <!-- <button type="button" class="close" aria-label="Close" > -->
              <span aria-hidden="true">×</span>
            <!-- </button> -->
            </rjb-btn>
          </div>
          <div class="modal-body">
            @for (field of fields; track field.key) {
            <div class="form-group">
              <app-form-fields [field]="field" [form]="form">></app-form-fields>
            </div>
            }
          </div>
          <div class="modal-footer">
            <div class="row mt-3">
              <div class="col-sm-6 float-left">
                <rjb-btn color="secondary" (onClick)="close()" label="cancel"/>
                <!-- <button type="button" class="btn btn-default" (click)="close()">
                  cancel
                </button> -->
              </div>
              <div class="col-sm-6 text-right">
                <rjb-btn type="submit" color="primary" label="Guardar"/>
                <!-- <button type="submit" class="btn btn-primary">Guardar</button> -->
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>`,
})
export class FormModalsComponent implements OnInit {
  @Input() fields!: FieldModel<string>[];
  @Output() formSubmit = new EventEmitter<any[]>();
  @HostBinding('@formAnimation') animateForm = true;

  public form!: FormGroup;
  public isActiveForm: boolean = false;
  public showModal: boolean = false;

  constructor(
    private formService: FormService,
    private formControlService: FormControlService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({});
    this.form = this.formControlService.toFormGroup(this.fields);
  }

  open() {
    this.showModal = true;
    document.body.classList.add('modal-open');
  }

  close() {
    this.showModal = false;
    document.body.classList.remove('modal-open');
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
    this.formControlService.processCheckboxFields(values);
    this.formSubmit.emit(values);
  }

  ngOnDestroy() {
    this.formService!.activeForm.emit(false);
  }
}
