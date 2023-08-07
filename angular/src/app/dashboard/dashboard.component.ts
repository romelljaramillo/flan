import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ['']
})
export class DashboardComponent extends BaseComponent {
  override url = 'dashboard';
  override entity = 'dashboard';
}
