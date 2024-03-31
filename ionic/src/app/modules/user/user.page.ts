import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
  IonSpinner,
  IonContent,
  IonCol,IonButton, IonIcon } from "@ionic/angular/standalone";

import { BaseComponent } from "@core/base.component";
import { FormComponent } from "@shared/components/form/form.component";
import { ListComponent } from "@shared/components/list/list.component";
import { SidebarRightComponent } from "@shared/components/sidebar-right/sidebar-right.component";

import { UserAttribute } from "./interfaces/user.interface";
import { UserService } from "./services/user.service";
import { BreadcrumbComponent } from "../../admin/layout/breadcrumb/breadcrumb.component";
import { addIcons } from "ionicons";
import { personAddOutline } from "ionicons/icons";

@Component({
    selector: "app-user",
    styles: [""],
    templateUrl: "./user.page.html",
    standalone: true,
    imports: [IonIcon, IonButton, 
        IonCol,
        IonContent,
        IonSpinner,
        IonLabel,
        IonItem,
        IonRow,
        IonGrid,
        CommonModule,
        FormComponent,
        ListComponent,
        SidebarRightComponent,
        BreadcrumbComponent
    ]
})
export class UserPage extends BaseComponent<UserAttribute> {

  constructor(protected userService: UserService) {
    super(userService);
    addIcons({ personAddOutline });
  }

  override onEdit(item: UserAttribute) {
    this.openMenu();
    if (!item.id) return;
    this.router.navigate([`/admin/${this.userService.entity}/edit/`, item.id]);
  }

  closeMenuEvent() {
    // this.router.navigate([`/admin/${this.userService.entity}`]);
    // this.getAll();
  }

  updateList() {
    this.router.navigate([`/admin/${this.userService.entity}`]);
    this.getAll();
  }
}
