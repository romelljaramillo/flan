import { Component, inject } from '@angular/core';
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
  IonButtons,
} from '@ionic/angular/standalone';
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
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
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
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
  ],
})
export class LayoutComponent {
  private menuCtrl = inject(MenuController);
  urlAdmin = '/admin';

  public appPages = [
    { title: 'Dashboard', url: this.urlAdmin + '/dashboard', icon: 'home' },
    { title: 'Users', url: this.urlAdmin + '/users', icon: 'people' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

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

  closeMenu() {
    console.log('close clicked');
    this.menuCtrl.close('right-menu');
  }
}
