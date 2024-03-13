import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { IonIcon, IonList, IonItem, IonLabel, IonThumbnail, IonListHeader } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { checkmark } from "ionicons/icons";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-lang-selector',
  standalone: true,
  imports: [IonListHeader, IonLabel, IonItem, IonList, IonIcon, IonThumbnail,
    CommonModule, TranslateModule
  ],
  templateUrl: './lang-selector.component.html',
  styleUrl: './lang-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSelectorComponent { 
  private translate = inject(TranslateService);
  @Output() languageChanged = new EventEmitter<string>();

  selectedLanguage: string;

  languages = [
    { name: 'English', code: 'en', flag: 'uk' },
    { name: 'Español', code: 'es', flag: 'es' },
    { name: 'Français', code: 'fr', flag: 'fr' }
  ];

  constructor() {
    addIcons({
      checkmark,
    });
    this.selectedLanguage = (this.translate.currentLang) ? this.translate.currentLang : 'en';
    // this.translate.setDefaultLang('en');
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(lang); 
    this.languageChanged.emit(lang);
  }
}
