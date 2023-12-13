import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldModel } from '../fields';

@Injectable({
  providedIn: 'root',
})
export class FormControlService {
  public fields!: FieldModel<string>[];

  /**
   * Form group genera y valida formulario
   *
   * @param fieldModel
   * @returns
   */
  toFormGroup(fields: FieldModel<string>[]) {
    const group: any = {};
    this.fields = fields;
    fields.forEach((field) => {
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
        case 'checkbox':
          let checkbox: any = {};
          if (field.options.length) {
            field.options.forEach((option) => {
              if (!field.value) field.value = [];
              checkbox[option.id] = new FormControl(
                field.value.some((v: { id: string }) => v.id === option.id)
              );
            });

            group[field.key!] = new FormGroup(checkbox);
          } else {
            group[field.key] = field.required
              ? new FormControl(field.value || false, Validators.required)
              : new FormControl(field.value || false);
          }
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
