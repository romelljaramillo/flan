import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
  IonItem,
  IonListHeader,
  IonLabel,
  IonList,
  IonRouterOutlet, IonIcon, IonMenu, IonButton, IonButtons, MenuController  } from "@ionic/angular/standalone";
import { SidebarRightComponent } from "@shared/components/sidebar-right/sidebar-right.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
  standalone: true,
  imports: [IonIcon, 
    RouterLink,
    RouterLinkActive,
    IonRouterOutlet,
    IonList,
    IonLabel,
    IonListHeader,
    IonItem,
    IonToolbar,
    IonContent,
    IonHeader,
    IonTitle,
    CommonModule,
    FormsModule,
    RouterModule,
    IonMenu,
    IonButton,
    IonButtons,
    SidebarRightComponent
  ],
})
export class DashboardPage {

  private menuCtrl = inject(MenuController);

  openMenu() {
    this.menuCtrl.open('dashboard');
  }

  closeMenu() {
    this.menuCtrl.close('dashboard');
  }
}
