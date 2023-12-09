import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormService } from './services/form.service';
import { FieldModel } from './fields/field-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormControlService } from './services/form-control.service';

@Component({
  selector: 'app-form-modals',
  styles: [''],
  template: `<div
    class="modal fade"
    id="form"
    tabindex="-1"
    aria-labelledby="formLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog  modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">formulario</h4>
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
        <div class="modal-body">
          <form (ngSubmit)="onSubmit()" [formGroup]="form" autocomplete="off">
            <div *ngFor="let field of fields" class="form-row row">
              <app-form-fields [field]="field" [form]="form">></app-form-fields>
            </div>
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
    </div>
  </div>`,
})
export class FormModalsComponent implements OnInit {
  @ViewChild('Modal') Modal!: ElementRef;
  public fields!: FieldModel<string>[];
  public form!: FormGroup;
  private subscActiveForm?: Subscription;

  constructor(
    private formService: FormService,
    private formControlService: FormControlService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({});
    console.log('ngOnInit - FormModalsComponent', this.fields);
    this.subscActiveForm = this.formService!.activeForm.subscribe((active) => {
      if (active) {
        this.subscActiveForm = this.formService.fields.subscribe(
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
    this.Modal.nativeElement.click();
  }

  ngOnDestroy() {
    this.subscActiveForm?.unsubscribe();
    this.Modal.nativeElement.click();
  }
}