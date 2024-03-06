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
  UserResponse,
  UserResponseData,
  UserResponseMeta,
} from "./interfaces/user.interface";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-user",
  styles: [""],
  templateUrl: "./user.page.html",
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
})
export class UserPage extends BaseComponent<
  UserResponse,
  UserResponseData,
  UserResponseMeta
> {
  constructor(protected userService: UserService) {
    super(userService);
  }
}
