import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldModel } from './field-model';
import { CommonModule } from '@angular/common';
import { CheckboxFieldComponent } from './checkbox/checkbox-field.component';
import { DateFieldComponent } from './date/date-field.component';
import { FileFieldComponent } from './file/file-field.component';
import { RadioFieldComponent } from './radio/radio-field.component';
import { SelectFieldComponent } from './select/select-field.component';
import { SwitchFieldComponent } from './switch/switch-field.component';
import { TextFieldComponent } from './text/text-field.component';
import { TextareaFieldComponent } from './textarea/textarea-field.component';

@Component({
  selector: 'app-form-fields',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxFieldComponent,
    DateFieldComponent,
    FileFieldComponent,
    RadioFieldComponent,
    SelectFieldComponent,
    SwitchFieldComponent,
    TextFieldComponent,
    TextareaFieldComponent
  ],
  styles: [''],
  template: `<ng-container [formGroup]="form">
  @if (field.type == 'hidden') {
    <input [formControlName]="field.key" [id]="field.key" [type]="field.type">
  } @else { 
    @switch (field.controlType) {
      @case ('hidden') {       
        <input-switch [form]="form" [field]="field"></input-switch>
      }
      @case ('checkbox') {       
        <input-checkbox [form]="form" [field]="field"></input-checkbox>
      }
      @case ('radio') {       
        <input-radio [form]="form" [field]="field"></input-radio>
      }
      @case ('text') {       
        <input-text [form]="form" [field]="field"></input-text>
      }
      @case ('number') {       
        <input-text [form]="form" [field]="field"></input-text>
      }
      @case ('password') {       
        <input-text [form]="form" [field]="field"></input-text>
      }
      @case ('email') {       
        <input-text [form]="form" [field]="field"></input-text>
      }
      @case ('image') {       
        <input-file [form]="form" [field]="field"></input-file>
      }
      @case ('file') {       
        <input-file [form]="form" [field]="field"></input-file>
      }
      @case ('textarea') {       
        <input-textarea [form]="form" [field]="field"></input-textarea>
      }
      @case ('date') {       
        <input-date [form]="form" [field]="field"></input-date>
      }
      @case ('datetime') {       
        <input-date [form]="form" [field]="field"></input-date>
      }
      @case ('select') {       
        <input-select [form]="form" [field]="field"></input-select>
      }
    }
  }
</ng-container>`,
})
export class FormFieldsComponent {
  @Input() field!: FieldModel<string>;
  @Input() form!: FormGroup;
}
