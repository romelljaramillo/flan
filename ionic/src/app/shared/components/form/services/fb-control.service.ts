import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldModel } from '../fields';
import { OptionInput } from '../interfaces/form.interface';

@Injectable({
  providedIn: 'root',
})
export class FbControlService {
  public fields!: FieldModel<string>[];

  private fb = inject(FormBuilder);

  toFormGroup(fields: FieldModel<any>[]): FormGroup {
    const group: {[key: string]: AbstractControl} = fields.reduce((acc: {[key: string]: AbstractControl}, field) => {
      let control: AbstractControl;

      switch (field.controlType) {
        case 'email':
          control = this.fb.control(field.value || '', field.required ? [Validators.required, Validators.email] : [Validators.email]);
          break;
        // case 'checkbox':
        //   control = this.handleCheckboxField(field);
        //   break;
        case 'select':
          control = this.handleSelectField(field);
          break;
        case 'file':
          control = this.fb.control(field.value || null, field.required ? [Validators.required] : []);
          break;
        default:
          control = this.fb.control(field.value || '', field.required ? [Validators.required] : []);
          break;
      }

      acc[field.key] = control;
      return acc;
    }, {});

    return this.fb.group(group);
  }

  private handleCheckboxField(field: FieldModel<any>): FormGroup {
    const group: {[key: string]: AbstractControl} = {};
    field.options.forEach(option => {
      group[option.id] = this.fb.control(field.value ? field.value.includes(option.id) : false);
    });
    return this.fb.group(group);
  }

  private handleSelectField(field: FieldModel<any>): AbstractControl {
    const validators = field.required ? [Validators.required] : [];
    if (field.multiple) {
      const value = field.value ? (field.value as OptionInput[]).map(obj => obj.id) : [];
      return this.fb.control(value, validators);
    }
    return this.fb.control(field.value || '', validators);
  }

  processCheckboxFields(values: any): void {
    this.fields.forEach((field) => {
      if (field.controlType === 'checkbox') {
        if (field.options && !field.options.length) {
          values[field.key] = values[field.key] ? 1 : 0;
          return;
        }
        values[field.key] = this.getSelectedCheckboxValues(
          field,
          values[field.key]
        );
      }
    });
  }

  private getSelectedCheckboxValues(
    field: any,
    checkbox: { [key: number]: boolean }
  ): number[] {
    return (
      field.options
        ?.filter((option: any) => checkbox[option.id])
        .map((option: any) => option.id) || []
    );
  }
}
