import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FieldModel } from '../fields/field-model';

@Injectable({
  providedIn: 'root',
})
export class FormControlService {
  
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
}
