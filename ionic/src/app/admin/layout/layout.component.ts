import { AfterViewInit, Component, ComponentRef, OnDestroy, ViewChild, ViewContainerRef, inject } from '@angular/core';
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
import { LocalizationComponent } from '@shared/components/localization/localization.component';

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
        ProfileComponent,
        Profile2Component,
        SidebarRightComponent]
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
  private menuCtrl = inject(MenuController);
  private sidebarRightService = inject(SidebarRightService);
  componenteActivo: string = '';
  suscripcion!: Subscription;

  // private vcr = inject(ViewContainerRef);
  @ViewChild('templateRightMenu', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  componentRef!: ComponentRef<ProfileComponent | Profile2Component | LocalizationComponent>;


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
  }

  ngAfterViewInit() {
    this.suscripcion = this.sidebarRightService.componenteActivo.subscribe(component => {
      this.loadComponent(component);
    });
  }

  loadComponent(component: string) {
    if(this.vcr) {
      this.vcr.clear();
    }

    switch(component) {
      case 'profile':
        this.componentRef = this.vcr.createComponent(ProfileComponent);
        break;
      case 'profile2':
        this.componentRef = this.vcr.createComponent(Profile2Component);
        break;
      case 'localization':
        this.componentRef = this.vcr.createComponent(LocalizationComponent);
          break;
      default:
        this.componenteActivo = 'No hay componente activo';
    }
    
    // if(component === 'profile') {
    //   this.componentRef = this.vcr.createComponent(ProfileComponent);
    // } else {
    //   this.componentRef = this.vcr.createComponent(Profile2Component);
    // }

    // Si quieres pasar datos o suscribirte a eventos del componente dinámico, puedes hacerlo así:
    // this.componentRef.instance.algunaPropiedad = 'algún valor';
    // this.componentRef.instance.algunEvento.subscribe(() => hacerAlgo());
  }

  closeMenu() {
    this.menuCtrl.close('right-menu');
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();

    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
