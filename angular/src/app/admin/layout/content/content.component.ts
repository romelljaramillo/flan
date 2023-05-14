import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `
    <div class="content-wrapper">
      <app-breadcrumb></app-breadcrumb>
      <section class="content">
        <div class="container-fluid">
          <router-outlet></router-outlet>
        </div>
      </section>
    </div>
  `,
  styles: [''],
})
export class ContentComponent {}
