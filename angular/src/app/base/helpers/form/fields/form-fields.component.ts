import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldModel } from './field-model';

@Component({
  selector: 'app-form-fields',
  styles: [''],
  template: `<ng-container [formGroup]="form">
  <input *ngIf="field.type == 'hidden'" [formControlName]="field.key" [id]="field.key" [type]="field.type">
  <div *ngIf="field.type != 'hidden'" [ngSwitch]="field.controlType" class="col-sm-12">
    <input-switch *ngSwitchCase="'switch'" [form]="form" [field]="field"></input-switch>
    <input-checkbox *ngSwitchCase="'checkbox'" [form]="form" [field]="field"></input-checkbox>
    <input-radio *ngSwitchCase="'radio'" [form]="form" [field]="field"></input-radio>
    <input-text *ngSwitchCase="'text'" [form]="form" [field]="field"></input-text>
    <input-text *ngSwitchCase="'number'" [form]="form" [field]="field"></input-text>
    <input-text *ngSwitchCase="'password'" [form]="form" [field]="field"></input-text>
    <input-text *ngSwitchCase="'email'" [form]="form" [field]="field"></input-text>
    <input-file *ngSwitchCase="'image'" [form]="form" [field]="field"></input-file>
    <input-file *ngSwitchCase="'file'" [form]="form" [field]="field"></input-file>
    <input-textarea *ngSwitchCase="'textarea'" [form]="form" [field]="field"></input-textarea>
    <input-date *ngSwitchCase="'date'" [form]="form" [field]="field"></input-date>
    <input-date *ngSwitchCase="'datetime'" [form]="form" [field]="field"></input-date>
    <input-select *ngSwitchCase="'select'" [form]="form" [field]="field"></input-select>
  </div>
</ng-container>`,
})
export class FormFieldsComponent {
  @Input() field!: FieldModel<string>;
  @Input() form!: FormGroup;

}
