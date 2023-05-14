import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormControlService } from '../services/form-control.service';
import { FormService } from '../services/form.service';

import { FieldModel } from './field-model';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styles: [''],
})
export class FormFieldsComponent implements OnInit {
  public fields!: FieldModel<string>[];

  public field!: FieldModel<string>;
  public form!: FormGroup;
  private formSubscriptionRender?: Subscription;

  public checked: boolean = false;

  constructor(
    private formService: FormService,
    private formControlService: FormControlService
  ) {}

  get isValid() {
    console.log(this.field.key);

    return (
      this.form!.controls[this.field.key].invalid &&
      this.form!.controls[this.field.key].touched
    );
  }

  ngOnInit() {
    this.formSubscriptionRender = this.formService!.renderForm.subscribe(
      (active) => {
        if (active) {
          this.formService.fields.subscribe((fields: FieldModel<string>[]) => {
            this.fields = fields;
            this.form = this.formControlService.toFormGroup(
              fields as FieldModel<string>[]
            );
          });
        }
      }
    );
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

    this.formService!.postData.emit(this.form.getRawValue());
  }

  closeForm() {
    this.formService!.renderForm.emit(false);
  }

  ngOnDestroy() {
    this.formSubscriptionRender?.unsubscribe();
  }
}
