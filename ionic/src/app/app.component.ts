import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonSplitPane, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
