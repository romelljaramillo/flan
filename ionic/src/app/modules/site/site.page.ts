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

import {
  SiteResponse,
  SiteResponseData,
  SiteResponseMeta,
} from "./interfaces/site.interface";
import { SiteService } from "./services/site.service";

@Component({
  selector: "app-site",
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
  templateUrl: "./site.page.html",
})
export class SitePage extends BaseComponent<
  SiteResponse,
  SiteResponseData,
  SiteResponseMeta
> {
  constructor(protected siteService: SiteService) {
    super(siteService);
  }
}
