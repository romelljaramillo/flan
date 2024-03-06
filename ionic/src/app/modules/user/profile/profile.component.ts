import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AuthService } from "@auth/auth.service";
import {
  IonTitle,
  IonFooter,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonAvatar,
  IonLabel,
  IonRow,
  IonIcon,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonText,
  IonMenuToggle
} from "@ionic/angular/standalone";
import { UserAttribute } from "../interfaces/user.interface";
import { addIcons } from "ionicons";
import {
  logOutOutline,
  exitOutline,
  settingsOutline,
  closeOutline,
  mailOutline,
  callOutline,
  personOutline,
  starOutline,
  briefcaseOutline,
} from "ionicons/icons";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    IonText,
    IonList,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCardContent,
    IonIcon,
    IonRow,
    IonLabel,
    IonAvatar,
    IonItem,
    IonContent,
    IonButton,
    IonButtons,
    IonToolbar,
    IonFooter,
    IonTitle,
    IonMenuToggle,
    CommonModule,
  ],
  template: `<p>profile works!</p>`,
  styleUrl: "./profile.component.scss",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent {
  private authService = inject(AuthService);

  public user: UserAttribute;

  constructor() {
    addIcons({
      logOutOutline,
      exitOutline,
      settingsOutline,
      closeOutline,
      mailOutline,
      callOutline,
      personOutline,
      starOutline,
      briefcaseOutline,
    });
    this.user = this.authService.userSession;
  }

  logout() {
    this.authService.logout();
  }
}
