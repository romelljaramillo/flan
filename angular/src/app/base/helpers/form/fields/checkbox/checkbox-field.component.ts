import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldModel } from '../field-model';

@Component({
  selector: 'input-checkbox',
  styles: [''],
  template: `
    <div class="form-group" [formGroup]="form">
      <label>{{ field.label }}</label>

      <!-- Caso individual -->
      <div *ngIf="!isOptions" class="custom-control custom-switch">
        <input class="custom-control-input" type="checkbox" [formControlName]="field.key"
        [id]="field.key" (change)="onChange($event)"
        [class]="!isValid ? 'is-invalid' : ''">
        <label [for]="field.key" class="custom-control-label">{{ label }}</label>
      </div>
      
      <!-- Caso de grupo -->
      <div *ngIf="isOptions" [formGroupName]="field.key" class="row">
        <div *ngFor="let option of field.options" class="form-check col-md-4">
          <input class="form-check-input" type="checkbox" [formControlName]="option.id"
          [id]="field.key + option.id"
          [class]="!isValid ? 'is-invalid' : ''">
          <label [for]="field.key + option.id" class="form-check-label">{{option.name}}</label>
        </div>
      </div>

      <div class="text-danger" *ngIf="!isValid">
        {{ field.label }}, no es válido
      </div>
  </div>
  `,
})
export class CheckboxFieldComponent implements OnInit {
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

  ngOnInit(){
    if(!this.field.options.length){
      this.isOptions = false;
      this.label = this.field.value ? 'Yes' : 'No';
    }
  }

  onChange(event: any) {
    this.label = event.target.checked ? 'Yes' : 'No';
  }

}
