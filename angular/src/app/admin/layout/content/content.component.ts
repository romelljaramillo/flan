import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [BreadcrumbComponent, RouterModule],
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
