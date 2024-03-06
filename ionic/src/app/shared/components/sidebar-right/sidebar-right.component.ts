import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonIcon, IonButtons, IonToolbar, IonButton, IonContent, IonMenu, MenuController, IonRouterOutlet } from "@ionic/angular/standalone";

@Component({
  selector: 'app-sidebar-right',
  standalone: true,
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss'],
  imports: [IonRouterOutlet, IonContent, IonButton, IonToolbar, IonButtons, IonIcon, IonMenu, RouterModule]
})
export class SidebarRightComponent {
  idConten = input<string>(); 
  private menuCtrl = inject(MenuController);
  constructor() { }

  openMenu() {
    this.menuCtrl.open('sidebar-menu');
  }

  closeMenu() {
    this.menuCtrl.close('sidebar-menu');
  }
}
