import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

import {
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonLabel,
  IonItem,
  IonIcon,
  IonMenu,
  IonMenuToggle,
  IonItemGroup,
  IonItemDivider,
  IonItemSliding,
  IonAccordionGroup,
  IonAccordion,
  MenuController,
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import {
  homeOutline,
  homeSharp,
  peopleOutline,
  peopleSharp,
  mailOutline,
  mailSharp,
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  bookmarkSharp,
  settingsOutline,
  settingsSharp,
  chevronDownOutline,
  chevronDownSharp,
  chevronForwardOutline,
  chevronForwardSharp,
  globeOutline,
  globeSharp,
  serverOutline,
  serverSharp,
  radioButtonOnOutline,
  radioButtonOnSharp,
} from "ionicons/icons";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  standalone: true,
  imports: [
    IonAccordion,
    IonAccordionGroup,
    IonItemSliding,
    IonItemDivider,
    IonItemGroup,
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonListHeader,
    IonList,
    IonContent,
    IonMenu,
    IonMenuToggle,
    CommonModule,
    FormsModule,
    RouterModule
  ],
})
export class SidebarComponent {
  urlAdmin = "/admin";

  menuRoutes = [
    { tab: "Dashboard", icon: "home", url: this.urlAdmin + "/dashboard" },
    {
      tab: "Usuarios",
      icon: "people",
      url: "",
      submenu: [
        {
          title: "Usuarios",
          url: this.urlAdmin + "/users",
          icon: "radio-button-on",
        },
        {
          title: "Roles",
          url: this.urlAdmin + "/roles",
          icon: "radio-button-on",
        },
        {
          title: "Permissions",
          url: this.urlAdmin + "/permissions",
          icon: "radio-button-on",
        },
      ],
    },
    {
      tab: "International",
      icon: "globe",
      url: "",
      submenu: [
        {
          title: "Langs",
          url: this.urlAdmin + "/langs",
          icon: "radio-button-on",
        },
      ],
    },
    {
      tab: "Site parameters",
      icon: "settings",
      url: "",
      submenu: [
        {
          title: "Configuración",
          url: this.urlAdmin + "/configurations",
          icon: "radio-button-on",
        },
      ],
    },
    {
      tab: "Advanced Parameters",
      icon: "server",
      url: "",
      submenu: [
        {
          title: "Sites",
          url: this.urlAdmin + "/sites",
          icon: "radio-button-on",
        },
      ],
    },
  ];

  constructor(private menu: MenuController) {
    addIcons({
      chevronDownOutline,
      chevronDownSharp,
      chevronForwardOutline,
      chevronForwardSharp,
      settingsOutline,
      settingsSharp,
      homeOutline,
      homeSharp,
      peopleOutline,
      peopleSharp,
      mailOutline,
      mailSharp,
      archiveOutline,
      archiveSharp,
      bookmarkOutline,
      bookmarkSharp,
      globeOutline,
      globeSharp,
      serverOutline,
      serverSharp,
      radioButtonOnOutline,
      radioButtonOnSharp,
    });
  }

  closeMenu() {
    this.menu.close();
  }

  onMenuItemSelected() {
    this.closeMenu();
  }
}
