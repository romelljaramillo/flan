import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { FormDefaultComponent } from './default/form-default.component';
import { FormModalsComponent } from './modals/form-modals.component';
import { FormDirective } from './form.directive';
import { FormService } from './services/form.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActionCrud } from '../../../permission/interfaces/permission.interface';

export enum TypeForm {
  default,
  modal,
}

@Component({
  selector: 'app-form',
  styles: [''],
  template: `<div *ngIf="canAdd" class="text-right">
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
  public canAdd: boolean = false;
  public canEdit: boolean = false;
  public canDelete: boolean = false;

  @ViewChild(FormDirective, { static: true }) viewForm!: FormDirective;

  constructor(
    public formService: FormService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.permissions();
    
    this.formSubscriptionInit = this.formService.initForm.subscribe(
      (active) => {
        if (active.active) {
          this.viewForm.viewContainerRef.remove();

          if (this.typeForm == 1) {
            this.viewForm.viewContainerRef.createComponent(FormModalsComponent);
          } else {
            this.viewForm.viewContainerRef.createComponent(FormDefaultComponent);
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

  private permissions() {
    this.authService
      .checkPermission({
        entity: this.authService.entity,
        action: ActionCrud.create,
      })
      .subscribe((canAdd) => (this.canAdd = canAdd));

    this.authService
      .checkPermission({
        entity: this.authService.entity,
        action: ActionCrud.edit,
      })
      .subscribe((canEdit) => (this.canEdit = canEdit));

    this.authService
      .checkPermission({
        entity: this.authService.entity,
        action: ActionCrud.edit,
      })
      .subscribe((canDelete) => (this.canDelete = canDelete));
  }

  renderForm(active = true) {
    this.formService.initForm.emit({ active: active });
  }

  ngOnDestroy() {
    this.formSubscriptionInit?.unsubscribe();
    this.formSubscriptionRender?.unsubscribe();
  }
}
