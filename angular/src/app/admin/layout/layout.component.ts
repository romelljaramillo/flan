import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent
  ],
  styles: [''],
  template: ` <div class="wrapper">
    <app-nav/>
    <app-sidebar/>
    <app-content/>
    <app-footer/>
  </div>`,
})
export class LayoutComponent {}
