import { EventEmitter, Injectable } from '@angular/core';
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
import { PermissionData } from 'src/app/permission/interfaces/permission.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public fields!: Observable<FieldModel<any>[]>;
  public data: any = {};
  public initForm = new EventEmitter<boolean>();
  public activeForm = new EventEmitter<boolean>();
  public postForm = new EventEmitter<any>();

  public files: Array<any> = [];
  public permission: PermissionData = {hasPermission: false};

  getForm(fieldsForm: FieldModel<string>[], data: any) {
    const fields: FieldModel<string>[] = [];

    if (fieldsForm) {
      fieldsForm.forEach((field) => {
        if(data) {
          field.value = data[field.key];
        } else {
          field.value = [];
        }

        if (!field.primarykey) {
          switch (field.controlType) {
            case 'text':
              fields.push(new TextField(field));
              break;
            case 'number':
              fields.push(new NumberField(field));
              break;
            case 'email':
              fields.push(new EmailField(field));
              break;
            case 'switch':
              fields.push(new SwitchField(field));
              break;
            case 'checkbox':
              fields.push(new CheckboxField(field));
              break;
            case 'radio':
              fields.push(new RadioField(field));
              break;
            case 'textarea':
              fields.push(new TextareaField(field));
              break;
            case 'password':
              fields.push(new PasswordField(field));
              break;
            case 'file':
              fields.push(new FileField(field));
              break;
            case 'image':
              fields.push(new ImageField(field));
              break;
            case 'date':
              fields.push(new DateField(field));
              break;
            case 'datetime':
              fields.push(new DatetimeField(field));
              break;
            case 'select':
              fields.push(new SelectField(field));
              break;
            case 'hidden':
              fields.push(new HiddenField(field));
              break;
          }
        } else {
          field.type = 'hidden';
          fields.push(new HiddenField(field));
        }
      });
    }
    this.fields = of(fields.sort((a, b) => a.order - b.order));
    this.activeForm.emit(true);
  }
}
