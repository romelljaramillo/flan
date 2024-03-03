import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { IonContent, IonSplitPane } from "@ionic/angular/standalone";

@Component({
  selector: 'app-front',
  templateUrl: './front.page.html',
  styleUrls: ['./front.page.scss'],
  standalone: true,
  imports: [IonSplitPane, IonContent, CommonModule, FormsModule, LayoutComponent]
})
export class FrontPage {

  constructor() { }

}
