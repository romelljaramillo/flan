import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormFieldsComponent } from './form-fields.component';
import { TextFieldComponent } from './text/text-field.component';
import { SwitchFieldComponent } from './switch/switch-field.component'
import { CheckboxFieldComponent } from './checkbox/checkbox-field.component';
import { RadioFieldComponent } from './radio/radio-field.component';
import { FileFieldComponent } from './file/file-field.component';
import { TextareaFieldComponent } from './textarea/textarea-field.component';
import { DateFieldComponent } from './date/date-field.component';
import { SelectFieldComponent } from './select/select-field.component';

@NgModule({
  declarations: [
    FormFieldsComponent,
    TextFieldComponent,
    SwitchFieldComponent,
    FileFieldComponent,
    TextareaFieldComponent,
    DateFieldComponent,
    SelectFieldComponent,
    CheckboxFieldComponent,
    RadioFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormFieldsComponent,
    TextFieldComponent,
    SwitchFieldComponent,
    FileFieldComponent,
    TextareaFieldComponent,
    DateFieldComponent,
    SelectFieldComponent,
    CheckboxFieldComponent,
    RadioFieldComponent
  ]
})
export class FormFieldsModule { }
