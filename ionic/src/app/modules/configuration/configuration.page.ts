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
import {
  FormComponent,
  TypeForm,
} from "@shared/components/form/form.component";
import { ListComponent } from "@shared/components/list/list.component";

import {
  ConfigurationResponse,
  ConfigurationResponseData,
  ConfigurationResponseMeta,
} from "./interfaces/configuration.interface";
import { ConfigurationService } from "./services/configuration.service";


@Component({
  selector: "app-configuration",
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
  templateUrl: "./configuration.page.html",
})
export class ConfigurationPage extends BaseComponent<
  ConfigurationResponse,
  ConfigurationResponseData,
  ConfigurationResponseMeta
> {
  constructor(protected configurationService: ConfigurationService) {
    super(configurationService);
    this.typeForm = TypeForm.default;
    this.activeForm(true);
  }

  override activeForm(isActive: boolean = false) {
    this.isFormActive = true;
    this.formService.activeForm.emit(true);
  }
}
