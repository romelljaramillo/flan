import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
  IonSpinner,
  IonContent,
  IonCol,
  IonButton,
  IonIcon,
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";

import { BaseComponent } from "@core/base.component";
import { ListComponent } from "@shared/components/list/list.component";
import { SidebarRightComponent } from "@shared/components/sidebar-right/sidebar-right.component";
import { BreadcrumbComponent } from "@admin/layout/breadcrumb/breadcrumb.component";

import { PermissionAttribute } from "./interfaces/permission.interface";
import { PermissionService } from "./services/permission.service";

@Component({
  selector: "app-permission",
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonCol,
    IonContent,
    IonSpinner,
    IonLabel,
    IonItem,
    IonRow,
    IonGrid,
    CommonModule,
    ListComponent,
    SidebarRightComponent,
    BreadcrumbComponent,
  ],
  styles: [""],
  templateUrl: "./permission.page.html",
})
export class PermissionPage extends BaseComponent<PermissionAttribute> {
  constructor(protected permissionService: PermissionService) {
    super(permissionService);
    addIcons({ addOutline });
  }
}
