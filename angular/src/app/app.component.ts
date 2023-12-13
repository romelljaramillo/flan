import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
  ],
  template: `<router-outlet></router-outlet>`,
  styles: ['']
})
export class AppComponent {
  title = 'WEB Sync Erp';
}
