import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { FormDefaultComponent } from './default/form-default.component';
import { FormModalsComponent } from './modals/form-modals.component';
import { FormDirective } from './form.directive';
import { FormService } from './services/form.service';

export enum TypeForm {
  default,
  modal,
}

@Component({
  selector: 'app-form',
  styles: [''],
  template: `<div *ngIf="formService.permissions.create" class="text-right">
      <button 
        type="button"
        class="btn btn-primary btn-sm mb-2 "
        title="crear nuevo"
        data-toggle="modal"
        data-target="#form"
        (click)="renderForm()"
      >
        Nuevo 
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <ng-template viewForm></ng-template>`,
})
export class FormComponent implements OnInit {
  @Input() typeForm: TypeForm = TypeForm.default;

  private formSubscriptionInit?: Subscription;
  private formSubscriptionRender?: Subscription;

  @ViewChild(FormDirective, { static: true }) viewForm!: FormDirective;

  constructor(public formService: FormService) {}

  ngOnInit() {
    this.formSubscriptionInit = this.formService.initForm.subscribe(
      (active) => {
        if (active.active) {
          this.viewForm.viewContainerRef.remove();

          if (this.typeForm == 1) {
            this.viewForm.viewContainerRef.createComponent(FormModalsComponent);
          } else {
            this.viewForm.viewContainerRef.createComponent(
              FormDefaultComponent
            );
          }
        } else {
          this.viewForm.viewContainerRef.remove();
        }
      }
    );

    this.formSubscriptionRender = this.formService.renderForm.subscribe(
      (active) => {
        if (!active) {
          this.viewForm.viewContainerRef.remove();
        }
      }
    );
  }

  renderForm(active = true) {
    this.formService.initForm.emit({ active: active });
  }

  ngOnDestroy() {
    this.formSubscriptionInit?.unsubscribe();
    this.formSubscriptionRender?.unsubscribe();
  }
}
