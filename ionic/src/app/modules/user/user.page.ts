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

import { BaseComponent } from "@core/base.component";
import { ListComponent } from "@shared/components/list/list.component";
import { SidebarRightComponent } from "@shared/components/sidebar-right/sidebar-right.component";
import { BreadcrumbComponent } from "@admin/layout/breadcrumb/breadcrumb.component";

import { UserAttribute } from "./interfaces/user.interface";
import { UserService } from "./services/user.service";
import { addIcons } from "ionicons";
import { personAddOutline } from "ionicons/icons";

@Component({
  selector: "app-user",
  styles: [""],
  templateUrl: "./user.page.html",
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
export class UserPage extends BaseComponent<UserAttribute> {
  constructor(protected userService: UserService) {
    super(userService);
    addIcons({ personAddOutline });
  }
}
