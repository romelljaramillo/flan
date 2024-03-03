import { Component, OnInit } from '@angular/core';
import { IonFooter, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonTitle, IonFooter, ]
})
export class FooterComponent {

  constructor() { }

}
