import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-images-slider',
  templateUrl: './images-slider.component.html',
  styleUrls: ['./images-slider.component.scss'],
  standalone: true,
  imports: [IonContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImagesSliderComponent {

  constructor() { }
}
