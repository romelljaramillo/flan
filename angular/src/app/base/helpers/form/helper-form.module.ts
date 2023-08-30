import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//Form
import { FormComponent } from './form.component';
import { FormModalsComponent } from './form-modals.component';
import { FormDefaultComponent } from './form-default.component';
import { InsertFormDirective } from './insert-form.directive';
import { FormFieldsModule } from './fields/form-fields.module';


@NgModule({
  declarations: [
    FormComponent,
    FormModalsComponent,
    FormDefaultComponent,
    InsertFormDirective,
  ],
  imports: [
    CommonModule,
    FormFieldsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormComponent,
    FormModalsComponent,
    FormDefaultComponent,
    InsertFormDirective,
  ],
})
export class HelperFormModule {}
