import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonMenuToggle,
  MenuController,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonItem,
  IonAvatar,
  IonButton,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ThemeSwitchComponent } from '@shared/components/theme-switch/theme-switch.component';
import { AuthService } from '@auth/auth.service';
import { UserAttribute } from '@modules/user/interfaces/user.interface';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonContent,
    IonMenuToggle,
    IonButton,
    IonAvatar,
    IonItem,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonMenuButton,
    IonHeader,
    CommonModule,
    FormsModule,
    ThemeSwitchComponent,
  ],
})
export class NavComponent implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private menuCtrl = inject(MenuController);
  public user: UserAttribute;

  constructor() {
    addIcons({ closeOutline });
    this.user = this.authService.userSession;
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  onAvatarClick() {
    console.log('Avatar clicked');
    this.menuCtrl.open('right-menu');
  }

  logout() {
    this.authService.logout();
  }
}
