import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldModel } from '../field-model';

@Component({
  selector: 'input-text',
  styles: [''],
  template: `
    <ng-container [formGroup]="form">
    <label [for]="field.key">{{field.label}}</label>
      <input [type]="field.type" [id]="field.key" [formControlName]="field.key" 
      class="form-control" [class]="!isValid ? 'is-invalid': ''">
      <div class="text-danger" *ngIf="!isValid">{{field.label}}, no es valido</div>
    </ng-container> 
    `
})
export class TextFieldComponent implements OnInit{

  @Input() form!: FormGroup;
  @Input() field!: FieldModel<string>;

  get isValid() { return this.form.controls[this.field.key].valid || !this.form.controls[this.field.key].touched; }

  constructor() {}

  ngOnInit(){
  }
}
