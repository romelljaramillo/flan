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
  LangAttribute,
  LangResponse,
  LangResponseData,
  LangResponseMeta,
} from "./interfaces/lang.interface";
import { LangService } from "./services/lang.service";

@Component({
  selector: "app-lang",
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
  templateUrl: "./lang.page.html",
})
export class LangPage extends BaseComponent<
  LangResponse,
  LangResponseData,
  LangResponseMeta,
  LangAttribute
> {
  constructor(protected langService: LangService) {
    super(langService);
  }
}
