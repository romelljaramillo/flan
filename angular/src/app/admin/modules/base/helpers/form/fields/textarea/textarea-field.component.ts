import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldModel } from '../field-model';

declare var $: any;

@Component({
  selector: 'input-textarea',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styles: [''],
  template: `
    <ng-container [formGroup]="form">
    <label [for]="field.key">{{field.label}}</label>
      <textarea [formControlName]="field.key" [id]="field.key" class="form-control " 
      [rows]="rows" [ngClass]="{'is-invalid':!isValid, 'summernote': displayEditor}"></textarea>

      <div class="text-danger" *ngIf="!isValid">{{field.label}}, no es valido</div>
    </ng-container> 
    `,
})
export class TextareaFieldComponent implements OnInit, AfterViewInit{

  @Input() form!: FormGroup;
  @Input() field!: FieldModel<string>;
  @Input() rows: string = '3';
  @Input() displayEditor: boolean = true;

  get isValid() { return this.form.controls[this.field.key].valid || !this.form.controls[this.field.key].touched; }

  ngOnInit(){}

  ngAfterViewInit(){
    $('.summernote').summernote();
  }
}
