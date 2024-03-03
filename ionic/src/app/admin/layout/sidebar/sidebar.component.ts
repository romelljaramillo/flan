import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonLabel,
  IonItem,
  IonIcon,
  IonMenu,
  IonMenuToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
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

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonListHeader,
    IonList,
    IonContent,
    IonMenu,
    IonMenuToggle,
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class SidebarComponent {
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
}
