import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  styles: [''],
  templateUrl: './nav.component.html'
})
export class NavComponent {

}
