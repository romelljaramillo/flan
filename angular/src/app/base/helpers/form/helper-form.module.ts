import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Form
import { FormComponent } from './form.component';
import { FormModalsComponent } from './modals/form-modals.component';
import { FormDefaultComponent } from './default/form-default.component';
import { FormDirective } from './form.directive';
import { FormFieldsModule } from './fields/form-fields.module';


@NgModule({
  declarations: [
    FormComponent,
    FormModalsComponent,
    FormDefaultComponent,
    FormDirective,
  ],
  imports: [
    CommonModule,
    FormFieldsModule,
  ],
  exports: [
    FormComponent,
    FormModalsComponent,
    FormDefaultComponent,
    FormDirective,
  ],
})
export class HelperFormModule {}
