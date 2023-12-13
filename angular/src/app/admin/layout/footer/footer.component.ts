import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  styles: [''],
  template: ` <footer class="main-footer">
    <strong>Copyright &copy; 2014-2021 <a href="#">Admin Sync</a>.</strong>
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block"><b>Version</b> 0.0.1</div>
  </footer>`,
})
export class FooterComponent {}
