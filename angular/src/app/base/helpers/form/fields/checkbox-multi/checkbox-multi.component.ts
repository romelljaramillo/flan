import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldModel } from '../field-model';

@Component({
  selector: 'app-input-checkbox-multi',
  styles: [''],
  template: `
    <ng-container [formGroup]="form">
      <label>{{ field.label }}</label>
      <div [formGroupName]="field.key">
        <div *ngFor="let option of field.options; let i = index" class="form-check">
          <input class="form-check-input" type="checkbox" [formControlName]="option.id"
          [id]="field.key + option.id">
          <!-- [class]="!isValid ? 'is-invalid' : ''"> -->
          <label [for]="field.key + option.id" class="form-check-label">{{option.value}}</label>
        </div>
      </div>
      <!-- <div class="text-danger" *ngIf="!isValid">
        {{ field.label }}, no es válido
      </div> -->
    </ng-container>
  `,
})
export class CheckboxMultiFieldComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() field!: FieldModel<string[]>;

  // get isValid() {
  //   return (
  //     this.form.controls[this.field.key].valid ||
  //     !this.form.controls[this.field.key].touched
  //   );
  // }

  ngOnInit(){}

}
