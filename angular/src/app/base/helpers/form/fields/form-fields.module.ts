import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormFieldsComponent } from './form-fields.component';
import { TextFieldComponent } from './text/text-field.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FileFieldComponent } from './file/file-field.component';
import { TextareaFieldComponent } from './textarea/textarea-field.component';
import { DateFieldComponent } from './date/date-field.component';
import { SelectFieldComponent } from './select/select-field.component';

@NgModule({
  declarations: [
    FormFieldsComponent,
    TextFieldComponent,
    CheckboxComponent,
    FileFieldComponent,
    TextareaFieldComponent,
    DateFieldComponent,
    SelectFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormFieldsComponent,
    TextFieldComponent,
    CheckboxComponent,
    FileFieldComponent,
    TextareaFieldComponent,
    DateFieldComponent,
    SelectFieldComponent
  ]
})
export class FormFieldsModule { }
