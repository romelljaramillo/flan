import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

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
            this.form = this.toFormGroup(this.fields as FieldModel<string>[]);
          });
        }
      }
    );
  }

  /**
   * Form group genera y valida formulario
   *
   * @param fieldModel
   * @returns
   */
  toFormGroup(fieldModel: FieldModel<string>[]) {
    const group: any = {};

    fieldModel.forEach((field) => {
      switch (field.controlType) {
        case 'email':
          group[field.key] = field.required
            ? new FormControl(field.value || '', [
                Validators.required,
                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
              ])
            : new FormControl(
                field.value || '',
                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
              );
          break;
        case 'file':
          group[field.key] = field.required
            ? new FormControl(field.value || null, Validators.required)
            : new FormControl(field.value || null);
          break;
        case 'select':
          if (field.multiple) {
            const value = field.value
              ? field.value.map((objeto: { id: string }) => objeto.id)
              : [];
            group[field.key] = field.required
              ? new FormControl(value, Validators.required)
              : new FormControl(value);
          } else {
            group[field.key] = field.required
              ? new FormControl(field.value || '', Validators.required)
              : new FormControl(field.value || '');
          }
          break;
        case 'checkbox-multi':
            let checkboxGroup: any = {};
            field.options?.forEach(option => {
              checkboxGroup[option.id] = new FormControl(
                field.value?.some((v: { id: string; }) => v.id === option.id)
              );
            });

            group[field.key!] = new FormGroup(checkboxGroup);

            break;
        default:
          group[field.key] = field.required
            ? new FormControl(field.value || '', Validators.required)
            : new FormControl(field.value || '');
          break;
      }
    });

    return new FormGroup(group);
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

    this.processCheckboxFields(values);
    
    this.formService!.postData.emit(values);
  }

  processCheckboxFields(values: any) {
    this.fields.forEach(field => {
      if (field.controlType === 'checkbox-multi') {
        values[field.key] = this.getSelectedCheckboxValues(field, values[field.key]);
      }
    });
  }

  getSelectedCheckboxValues(field: any, checkboxGroup: { [key: number]: boolean }): number[] {
    return field.options?.filter((option: any) => checkboxGroup[option.id]).map((option: any) => option.id) || [];
  }

  closeForm() {
    this.formService!.renderForm.emit(false);
  }

  ngOnDestroy() {
    this.formSubscriptionRender?.unsubscribe();
  }
}
