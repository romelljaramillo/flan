import { Component } from '@angular/core';

import { UserAttribute, UserResponseData } from './interfaces/user.interface';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-user',
  styles: [''],
  template: `<div class="row">
    <div *ngIf="isLoading" class="text-center">
      <i class="fas fa-spinner fa-pulse"></i>
    </div>
    <div class="col-12">
      <app-form [typeForm]="typeForm"></app-form>
    </div>
    <div class="col-12">
      <app-list></app-list>
    </div>
  </div>`,
})
export class UserComponent extends BaseComponent {
  override data: UserResponseData[] = [];
  override items: Array<UserAttribute> = [];
  override url = 'users';
  override entity = 'users';
}
