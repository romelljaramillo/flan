import {
  Component,
  OnInit,
  ViewContainerRef,
  inject,
  TemplateRef,
  ComponentRef,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

import {
  MenuController,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonAvatar,
  IonButton,
  IonIcon,
  IonMenu,
  IonContent,
  IonThumbnail,
  IonLabel,
  IonSelect,
  IonMenuToggle,
  IonSelectOption, IonItem, IonList } from "@ionic/angular/standalone";
import { ActivatedRoute } from "@angular/router";
import { addIcons } from "ionicons";
import { closeOutline, notificationsOutline, globe } from "ionicons/icons";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

import { AuthService } from "@auth/auth.service";
import { UserAttribute } from "@modules/user/interfaces/user.interface";
import { SidebarRightService } from "@shared/services/sidebar-right.service";
import { ThemeSwitchComponent } from "@shared/components/theme-switch/theme-switch.component";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
  standalone: true,
  imports: [IonList, IonItem, 
    IonContent,
    IonLabel,
    IonThumbnail,
    IonIcon,
    IonButton,
    IonAvatar,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonMenuButton,
    IonHeader,
    IonMenu,
    IonContent,
    IonSelect,
    IonSelectOption,
    IonMenuToggle,  
    CommonModule,
    RouterModule,
    ThemeSwitchComponent,
    TranslateModule,
  ],
})
export class NavComponent implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private SidebarRightService = inject(SidebarRightService);
  private menuCtrl = inject(MenuController);
  public user: UserAttribute;
  private translate = inject(TranslateService);

  selectedLanguage: string;
  showDropdown = false;

  constructor() {
    addIcons({ closeOutline, notificationsOutline, globe });
    this.user = this.authService.userSession;
    // this.translate.setDefaultLang('en');
    this.selectedLanguage = this.translate.currentLang;
  }

  // changeLanguage(e: CustomEvent) {
  //   this.translate.use(e.detail.value); 
  // }
  // changeLanguage(lang: string) {
  //   this.translate.use(lang);
  //   this.selectedLanguage = lang;
  // }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.selectedLanguage = lang;
    this.showDropdown = false;
  }

  changeCurrency(currency: string) {
    console.log('Cambiando a moneda:', currency);
    this.showDropdown = false;
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get("id") as string;
  }

  openMenu(component: string) {
    this.menuCtrl.open("right-menu");
    this.SidebarRightService.cambiarComponente(component);
  }

  closeMenu() {
    this.menuCtrl.close("right-menu");
  }

  logout() {
    this.authService.logout();
  }
}
