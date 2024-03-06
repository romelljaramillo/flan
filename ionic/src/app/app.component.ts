import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/angular/standalone';
import { ThemeSwitchService } from '@shared/services/theme-switch.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonSplitPane, IonApp, IonRouterOutlet],
})
export class AppComponent {
  private themeSwitchService = inject(ThemeSwitchService);

  constructor() {}
}
