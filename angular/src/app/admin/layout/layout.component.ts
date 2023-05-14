import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  styles: [''],
  template: ` <div class="wrapper">
    <app-nav></app-nav>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
    <app-footer></app-footer>
  </div>`,
})
export class LayoutComponent {}
