import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-pages',
  standalone: true,  
  imports: [
    CommonModule,
    LayoutComponent
  ],
  template: `<app-layout/>`,
  styles: ['']
})
export class PagesComponent {

}
