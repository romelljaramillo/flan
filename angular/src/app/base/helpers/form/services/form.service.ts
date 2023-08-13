import { EventEmitter, Injectable } from '@angular/core';
import { FormActive, FieldForm } from '../interfaces/form.interface';
import { Observable, of } from 'rxjs';

import {
  SwitchField,
  CheckboxField,
  DateField,
  DatetimeField,
  EmailField,
  FieldModel,
  FileField,
  HiddenField,
  ImageField,
  NumberField,
  PasswordField,
  RadioField,
  SelectField,
  TextareaField,
  TextField,
} from '../fields';
import { PermissionsData } from 'src/app/permission/interfaces/permission.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  fields!: Observable<FieldModel<any>[]>;

  public data: any = {};
  public initForm = new EventEmitter<FormActive>();
  public renderForm = new EventEmitter<boolean>();
  public postData = new EventEmitter<any>();

  public files: Array<any> = [];
  public permissions: PermissionsData = {hasPermission: false};

  getForm(dataFields: FieldForm[] = []) {
    const form: FieldModel<string>[] = [];

    if (dataFields) {
      console.log(dataFields);

      dataFields.forEach((field) => {
        field.value = this.data[field.key];

        if (!field.primarykey) {
          switch (field.controlType) {
            case 'text':
              form.push(new TextField(field));
              break;
            case 'number':
              form.push(new NumberField(field));
              break;
            case 'email':
              form.push(new EmailField(field));
              break;
            case 'switch':
              form.push(new SwitchField(field));
              break;
            case 'checkbox':
              form.push(new CheckboxField(field));
              break;
            case 'radio':
              form.push(new RadioField(field));
              break;
            case 'textarea':
              form.push(new TextareaField(field));
              break;
            case 'password':
              form.push(new PasswordField(field));
              break;
            case 'file':
              form.push(new FileField(field));
              break;
            case 'image':
              form.push(new ImageField(field));
              break;
            case 'date':
              form.push(new DateField(field));
              break;
            case 'datetime':
              form.push(new DatetimeField(field));
              break;
            case 'select':
              form.push(new SelectField(field));
              break;
            case 'hidden':
              form.push(new HiddenField(field));
              break;
          }
        } else {
          field.type = 'hidden';
          form.push(new HiddenField(field));
        }
      });
    }

    // return of(form.sort((a, b) => a.order - b.order));
    this.fields = of(form.sort((a, b) => a.order - b.order));
    this.renderForm.emit(true);

  }
}
