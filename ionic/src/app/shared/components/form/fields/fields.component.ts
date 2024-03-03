import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldModel } from './field-model';
import { CommonModule } from '@angular/common';
import { FileFieldComponent } from './file/file-field.component';
import {
  IonInput,
  IonTextarea,
  IonRadioGroup,
  IonCheckbox,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonThumbnail, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-form-fields',
  standalone: true,
  imports: [IonItem, 
    CommonModule,
    ReactiveFormsModule,
    FileFieldComponent,
    IonLabel,
    IonToggle,
    IonCheckbox,
    IonRadioGroup,
    IonInput,
    IonTextarea,
    IonCheckbox,
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonThumbnail
  ],
  styleUrls: ['./fields.component.scss'],
  templateUrl: './fields.component.html',
})
export class FieldsComponent {
  @Input() field!: FieldModel<string>;
  @Input() form!: FormGroup;
  public previewImage: any = null;

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
