import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldModel } from '../field-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
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
        @for(opt of field.options; track $index){
          <option [value]="opt.id">{{ opt.name }}</option>
        }
      </select>
      @if (!isValid) {
        <div class="text-danger">{{ field.label }}, no es valido</div>
      }
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
  
  ngOnInit() {}

}
