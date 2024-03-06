import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
  IonThumbnail, IonLabel } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ThemeSwitchComponent } from '@shared/components/theme-switch/theme-switch.component';
import { AuthService } from '@auth/auth.service';
import { UserAttribute } from '@modules/user/interfaces/user.interface';
import { addIcons } from 'ionicons';
import { closeOutline, notificationsOutline } from 'ionicons/icons';
import { SidebarRightService } from '../../../shared/services/sidebar-right.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [IonContent, IonLabel, 
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
    CommonModule,
    RouterModule,
    ThemeSwitchComponent,
  ],
})
export class NavComponent implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private SidebarRightService = inject(SidebarRightService);
  private router = inject(Router);
  private menuCtrl = inject(MenuController);

  public user: UserAttribute;

  constructor() {
    addIcons({ closeOutline, notificationsOutline });
    this.user = this.authService.userSession;
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  onSidebarRight(componente: string) {
    this.menuCtrl.open('right-menu');
    this.SidebarRightService.cambiarComponente(componente);
  }

  logout() {
    this.authService.logout();
  }
}
