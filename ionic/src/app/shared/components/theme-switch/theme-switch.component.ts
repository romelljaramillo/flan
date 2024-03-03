import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButtons, IonIcon, IonButton],
})
export class ThemeSwitchComponent {
  darkMode: boolean | undefined;

  constructor() {
    addIcons({ sunnyOutline, moonOutline });

    const savedTheme = localStorage.getItem('theme');
    this.darkMode = savedTheme
      ? savedTheme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.updateTheme(this.darkMode);
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.updateTheme(this.darkMode);
  }

  updateTheme(darkMode: boolean) {
    document.body.classList.toggle('dark', darkMode);

    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.setAttribute('content', darkMode ? 'dark' : 'light');
    }

    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }
}
