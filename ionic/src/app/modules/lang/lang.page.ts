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

import { LangAttribute } from "./interfaces/lang.interface";
import { LangService } from "./services/lang.service";

@Component({
  selector: "app-lang",
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
  templateUrl: "./lang.page.html",
})
export class LangPage extends BaseComponent<LangAttribute> {
  constructor(protected langService: LangService) {
    super(langService);
    addIcons({ addOutline });
  }
}
