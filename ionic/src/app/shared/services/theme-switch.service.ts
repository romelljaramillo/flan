import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
  darkMode: boolean | undefined;

  constructor() { 
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
