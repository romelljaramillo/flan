import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldModel } from '../field-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input-text',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styles: [''],
  template: `
    <ng-container [formGroup]="form">
      <label [for]="field.key">{{ field.label }}</label>
      <input
        [type]="field.type"
        [id]="field.key"
        [formControlName]="field.key"
        class="form-control"
        [class]="!isValid ? 'is-invalid' : ''"
      />
      @if (!isValid) {
      <div class="text-danger">{{ field.label }}, no es valido</div>
      }
    </ng-container>
  `,
})
export class TextFieldComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() field!: FieldModel<string>;

  get isValid() {
    return (
      this.form.controls[this.field.key].valid ||
      !this.form.controls[this.field.key].touched
    );
  }

  constructor() {}

  ngOnInit() {}
}
