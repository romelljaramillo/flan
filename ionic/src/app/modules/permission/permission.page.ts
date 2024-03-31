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
} from "@ionic/angular/standalone";

import { BaseComponent } from "@core/base.component";
import { FormComponent } from "@shared/components/form/form.component";
import { ListComponent } from "@shared/components/list/list.component";

import { PermissionAttribute } from "./interfaces/permission.interface";
import { PermissionService } from "./services/permission.service";

@Component({
  selector: "app-permission",
  standalone: true,
  imports: [
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
  ],
  styles: [""],
  templateUrl: "./permission.page.html",
})
export class PermissionPage extends BaseComponent<PermissionAttribute> {
  constructor(protected permissionService: PermissionService) {
    super(permissionService);
  }
}
