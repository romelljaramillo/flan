import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonSplitPane, IonContent } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { ThemeSwitchService } from '@shared/services/theme-switch.service';
import { register } from 'swiper/element/bundle';
import { LayoutComponent } from "./admin/layout/layout.component";

register();

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    standalone: true,
    imports: [IonContent, IonSplitPane, IonApp, IonRouterOutlet, LayoutComponent]
})
export class AppComponent {
  private themeSwitchService = inject(ThemeSwitchService);
  private translate: TranslateService = inject(TranslateService);

  constructor() {
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['en', 'es', 'fr']);
  }
}
