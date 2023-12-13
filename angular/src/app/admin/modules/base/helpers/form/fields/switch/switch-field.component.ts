import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldModel } from '../field-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input-switch',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styles: [''],
  template: `
    <label [for]="field.key">{{field.label}}</label>
    <div class="custom-control custom-switch" [formGroup]="form">
      <input type="checkbox" [id]="field.key" [formControlName]="field.key"
        class="custom-control-input" (change)="onChange($event)" [checked]="checked">
      <label [for]="field.key" class="custom-control-label">{{label}}</label>
      <div class="text-danger" *ngIf="!isValid">{{field.label}} is invalid</div>
    </div>
    `
})
export class SwitchFieldComponent implements OnInit{

  @Input() form!: FormGroup;
  @Input() field!: FieldModel<string>;

  label!: string | undefined;
  checked: boolean = false;

  get isValid() { return this.form.controls[this.field.key].valid || !this.form.controls[this.field.key].touched; }

  ngOnInit(){
    this.checked = this.field.value ? true : false;
    this.label = this.field.value ? this.field.options[0].name : this.field.options[1].name;
  }
  
  onChange(event: any) {
    this.label = event.target.checked ? this.field.options[0].name : this.field.options[1].name;
  }

}
