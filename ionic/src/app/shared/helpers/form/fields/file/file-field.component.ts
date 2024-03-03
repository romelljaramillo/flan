import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldModel } from '../field-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input-file',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styles: [''],
  template: `
    <ng-container [formGroup]="form">
      <label [for]="field.key">{{field.label}}</label>
      <div class="custom-file">
        @switch (field.controlType) {
          @case('file') {
            <input [id]="field.key" [type]="field.type"
            class="custom-file-input" (change)="onFileChange($event)"/>
          }
          @case('image') {
            <input [id]="field.key" [type]="field.type"
            class="custom-file-input" (change)="onImageChange($event)" accept="image/*">
          }
        }
        <label [attr.for]="field.key" class="custom-file-label">Seleccione archivo</label>
      </div>

      @if(!isValid) {
        <div class="text-danger">{{field.label}}, no es valido</div>
      }

      @if (field.controlType === 'image') {
        <img [src]="previewImage || field.value" class="img-fluid mt-3">
      }
    </ng-container> 
    `
})
export class FileFieldComponent {

  @Input() form!: FormGroup;
  @Input() field!: FieldModel<string>;

  public previewImage: any = null;

  get isValid() { return this.form.controls[this.field.key].valid || !this.form.controls[this.field.key].touched; }

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
  
    if (!file) {
      this.previewImage = null;
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
  
    reader.readAsDataURL(file);
  }

  onImageChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    let file = fileInput.files?.[0];
  
    if (!file) {
      this.previewImage = null;
      return;
    }
  
    this.form?.controls[this.field.key].setValue(file);
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
  }
}
