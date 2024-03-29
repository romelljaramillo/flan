import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldModel } from '../field-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input-date',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styles: [''],
  template: ` <ng-container [formGroup]="form">
    <label [for]="field.key">{{ field.label }}</label>
    <input
      [type]="datetype"
      [id]="field.key"
      [formControlName]="field.key"
      class="form-control"
      [class]="!isValid ? 'is-invalid' : ''"
    />
    <div class="text-danger" *ngIf="!isValid">
      {{ field.label }}, no es valido
    </div>
  </ng-container>`,
})
export class DateFieldComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() field!: FieldModel<string>;
  datetype: string = '';

  get isValid() {
    return (
      this.form.controls[this.field.key].valid ||
      !this.form.controls[this.field.key].touched
    );
  }

  constructor() {}

  ngOnInit() {
    this.datetype =
    this.field!.type == 'datetime' ? this.field.type + '-local' : this.field.type;
  }
}
