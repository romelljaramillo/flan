import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//Form
import { FormComponent } from './form.component';
import { FormDefaultComponent } from './form-default.component';
import { FormModalsComponent } from './form-modals.component';
import { FormStaticComponent } from './form-static.component';
import { InsertFormDirective } from './insert-form.directive';
import { FormFieldsModule } from './fields/form-fields.module';
import { FormExtensionsModule } from './form-extensions/form-extensions.module';


@NgModule({
  declarations: [
    FormComponent,
    FormDefaultComponent,
    FormModalsComponent,
    FormStaticComponent,
    InsertFormDirective,
  ],
  imports: [
    CommonModule,
    FormFieldsModule,
    ReactiveFormsModule,
    FormExtensionsModule
  ],
  exports: [
    FormComponent,
    FormDefaultComponent,
    FormModalsComponent,
    FormStaticComponent,
    InsertFormDirective,
  ],
})
export class HelperFormModule {}
