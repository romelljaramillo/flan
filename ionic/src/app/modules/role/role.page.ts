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

import { RoleAttribute } from "./interfaces/role.interface";
import { RoleService } from "./services/role.service";

@Component({
  selector: "app-role",
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
  templateUrl: "./role.page.html",
})
export class RoleComponent extends BaseComponent<RoleAttribute> {
  constructor(protected roleService: RoleService) {
    super(roleService);
  }
}
