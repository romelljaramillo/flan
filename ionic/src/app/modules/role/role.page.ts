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

import { RoleAttribute } from "./interfaces/role.interface";
import { RoleService } from "./services/role.service";


@Component({
  selector: "app-role",
  styles: [""],
  templateUrl: "./role.page.html",
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
})
export class RolePage extends BaseComponent<RoleAttribute> {
  constructor(protected roleService: RoleService) {
    super(roleService);
    addIcons({ addOutline });
  }
}
