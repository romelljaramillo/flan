import { Component, EnvironmentInjector, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { authRoutes } from './auth.routes';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class AuthPage {
  public environmentInjector = inject(EnvironmentInjector);
  constructor() {
    addIcons({ triangle, ellipse, square });
  }
}
