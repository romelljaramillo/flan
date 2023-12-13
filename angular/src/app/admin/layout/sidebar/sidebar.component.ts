import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserAttribute } from '@adminModule/user/interfaces/user.interface';
import { AuthService } from '@adminModule/auth/services/auth.service';


declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    SlicePipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public user: UserAttribute;

  public menuRoutes = [
    { tab: 'Dashboard', icon: 'tachometer-alt', url: '/dashboard'},
    { tab: 'Usuarios', icon: 'users', submenu: [
      {title: 'Usuarios', url: '/dashboard/users', icon: 'circle'},
      {title: 'Roles', url: '/dashboard/roles', icon: 'circle'},
      {title: 'Permissions', url: '/dashboard/permissions', icon: 'circle'}
    ]},
    { tab: 'International', icon: 'globe', submenu: [
      {title: 'Langs', url: '/dashboard/langs', icon: 'circle'}
    ]},
    { tab: 'Parámetros del site', icon: 'cog', submenu: [
      {title: 'Configuración', url: '/dashboard/configurations', icon: 'circle'}
    ]},
    { tab: 'Parámetros Avanzados', icon: 'cog', submenu: [
      {title: 'Sites', url: '/dashboard/sites', icon: 'circle'}
    ]},
  ];

  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.userSession;
  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
    $.widget.bridge('uibutton', $.ui.button)
  }


  logout() {
    this.authService.logout();
  }
}
