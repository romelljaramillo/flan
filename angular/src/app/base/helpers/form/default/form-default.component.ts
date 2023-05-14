import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormService } from '../services/form.service';
import { FieldModel } from '../fields/field-model';

@Component({
  selector: 'app-form-default',
  styles: [''],
  template: `<div class="card card-primary mt-2">
    <div class="card-header">
      <h3 class="card-title">Formulario</h3>
    </div>
    <div class="card-body">
      <app-form-fields></app-form-fields>
    </div>
  </div>`,
})
export class FormDefaultComponent implements OnInit {
  fields: FieldModel<string>[] | null = [];
  form!: FormGroup;

  constructor(private formService: FormService) {}

  ngOnInit() {}

  closeForm() {
    this.formService.renderForm.emit(false);
  }
}
