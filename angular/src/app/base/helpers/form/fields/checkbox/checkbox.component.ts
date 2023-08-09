import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldModel } from '../field-model';

@Component({
  selector: 'app-input-checkbox',
  styles: [''],
  template: `
    <label [for]="field.key">{{field.label}}</label>
    <div class="custom-control custom-switch" [formGroup]="form">
      <input [type]="field.type" [id]="field.key" [formControlName]="field.key" [checked]="checked"
        class="custom-control-input" (change)="onChange($event)">
      <label [for]="field.key" class="custom-control-label">{{label}}</label>
      <div class="text-danger" *ngIf="!isValid">{{field.label}} is invalid</div>
    </div>
    `
})
export class CheckboxComponent implements OnInit{

  @Input() form!: FormGroup;
  @Input() field!: FieldModel<string>;

  label!: string | undefined;
  checked: boolean = false;

  get isValid() { return this.form.controls[this.field.key].valid || !this.form.controls[this.field.key].touched; }

  ngOnInit(){
    this.checked = (this.field.value == this.field.options[0].value) ? true : false;
    this.label = (this.field.value == this.field.options[0].value) ? this.field.options[0].label : this.field.options[1].label
  }
  
  onChange(event: any) {
    const value = event.target.checked ? this.field.options[0].value : this.field.options[1].value;
    this.label = event.target.checked ? this.field.options[0].label : this.field.options[1].label;
    this.form.controls[this.field.key]!.setValue(value);
  }
}
