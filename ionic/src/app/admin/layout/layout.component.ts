import { Component, OnDestroy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MenuController,
  IonSplitPane,
  IonContent,
  IonListHeader,
  IonList,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonButton,
  IonButtons, IonFooter, IonRouterOutlet, IonThumbnail, IonRouterLink } from '@ionic/angular/standalone';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { addIcons } from 'ionicons';
import {
  closeOutline,
  homeOutline,
  homeSharp,
  peopleOutline,
  peopleSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp,
} from 'ionicons/icons';

import { Subscription } from 'rxjs';
import { SidebarRightService } from '@shared/services/sidebar-right.service';
import { Profile2Component } from '@admin/dashboard/profile2/profile2.component';
import { ProfileComponent } from '@modules/user/profile/profile.component';
import { SidebarRightComponent } from '@shared/components/sidebar-right/sidebar-right.component';
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: true,
    imports: [IonRouterLink, IonThumbnail, IonRouterOutlet,
        IonFooter,
        IonButtons,
        IonButton,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonLabel,
        IonItem,
        IonIcon,
        IonList,
        IonListHeader,
        IonContent,
        IonSplitPane,
        ContentComponent,
        SidebarComponent,
        NavComponent,
        FooterComponent,
        IonMenu,
        IonMenuToggle,
        CommonModule,
        RouterModule,
        FormsModule,
        ProfileComponent,
        Profile2Component,
        SidebarRightComponent, BreadcrumbComponent]
})
export class LayoutComponent implements OnDestroy {
  private menuCtrl = inject(MenuController);
  private sidebarRightService = inject(SidebarRightService);
  componenteActivo: string = '';
  suscripcion: Subscription;

  constructor() {
    addIcons({
      closeOutline,
      homeOutline,
      homeSharp,
      peopleOutline,
      peopleSharp,
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
    });

    this.suscripcion = this.sidebarRightService.componenteActivo.subscribe(activo => {
      this.componenteActivo = activo;
    });
  }


  closeMenu() {
    this.menuCtrl.close('right-menu');
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }
}
