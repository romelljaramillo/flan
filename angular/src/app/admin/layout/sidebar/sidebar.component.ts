import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserAttribute } from 'src/app/user/interfaces/user.interface';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public user: UserAttribute;

  constructor(
    private authService: AuthService
  ) {
    this.user = authService.userSession;
  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
    $.widget.bridge('uibutton', $.ui.button)
  }


  logout() {
    this.authService.logout();
  }
}
