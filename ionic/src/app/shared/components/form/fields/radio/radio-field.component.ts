import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldModel } from '../field-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input-radio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styles: [''],
  template: `
    <div class="form-group" [formGroup]="form">
      <label>{{ field.label }}</label>
      @for (option of field.options; track $index) {
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          [formControlName]="field.key"
          [id]="field.key + option.id"
          [value]="option.id"
          [class]="!isValid ? 'is-invalid' : ''"
        />
        <label [for]="field.key + option.id" class="form-check-label">
        {{option.name}}
        </label>
      </div>
      }
      @if (!isValid) {
        <div class="text-danger">{{field.label}}, no es valido</div>
      }
    </div>
  `,
})
export class RadioFieldComponent {
  @Input() form!: FormGroup;
  @Input() field!: FieldModel<string[]>;

  label: string | undefined;
  isOptions: boolean = true;

  get isValid() {
    return (
      this.form.controls[this.field.key].valid ||
      !this.form.controls[this.field.key].touched
    );
  }

}
