import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-container',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<ng-container class="invalid-feedback" *ngIf="control && control.invalid && (control.dirty || control.touched)"
    ><ng-content ></ng-content
  ></ng-container>`,
  styles: [
    `
      :host {
        width: 100%;
        margin-top: 0.25rem;
        font-size: .875em;
        color: #dc3545;
      }
    `,
  ],
})
export class FormErrorContainerComponent {
  // tslint:disable-next-line: no-input-rename
  @Input('forControl') control!: AbstractControl | null;
  constructor() {}
}
