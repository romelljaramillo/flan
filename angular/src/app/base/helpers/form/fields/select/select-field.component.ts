import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldModel } from '../field-model';

@Component({
  selector: 'app-input-select',
  styles: [''],
  template: `
    <ng-container [formGroup]="form">
      <label [for]="field.key">{{ field.label }}</label>
      <select
        [formControlName]="field.key"
        [id]="field.key"
        class="form-control"
        [class]="!isValid ? 'is-invalid' : ''" 
        [multiple]="field.multiple">
        <option *ngFor="let opt of field.options; let i=index" [value]="opt.id">
          {{ opt.value }}
        </option>
      </select>
      <div class="text-danger" *ngIf="!isValid">
        {{ field.label }}, no es valido
      </div>
    </ng-container>
  `,
})
export class SelectFieldComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() field!: FieldModel<string>;

  get isValid() {
    return (
      this.form.controls[this.field.key].valid ||
      !this.form.controls[this.field.key].touched
    );
  }

  constructor() {
    
  }
  
  ngOnInit() {}
}
