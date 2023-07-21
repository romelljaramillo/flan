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

  public menuRoutes = [
    { tab: 'Dashboard', icon: 'tachometer-alt', submenu: [
      {title: 'Home', url: '/dashboard', icon: 'circle'}
    ]},
    { tab: 'Usuarios', icon: 'users', submenu: [
      {title: 'Usuarios', url: '/dashboard/users', icon: 'circle'},
      {title: 'Roles', url: '/dashboard/roles', icon: 'circle'},
      {title: 'Permissions', url: '/dashboard/permissions', icon: 'circle'}
    ]},
    { tab: 'International', icon: 'globe', submenu: [
      {title: 'Langs', url: '/dashboard/langs', icon: 'circle'}
    ]},
    { tab: 'Parámetros Avanzados', icon: 'cog', submenu: [
      {title: 'Sites', url: '/dashboard/sites', icon: 'circle'}
    ]},
  ];

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
