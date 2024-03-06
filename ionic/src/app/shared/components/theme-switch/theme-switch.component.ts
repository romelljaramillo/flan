import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import { ThemeSwitchService } from '../../services/theme-switch.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButtons, IonIcon, IonButton],
})
export class ThemeSwitchComponent {
  darkMode: boolean | undefined;

  private themeSwitchService = inject(ThemeSwitchService);

  constructor() {
    addIcons({ sunnyOutline, moonOutline });
  }

  toggleTheme() {
    this.themeSwitchService.toggleTheme();
  }
}
