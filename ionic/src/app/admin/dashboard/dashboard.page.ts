import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonTitle, IonHeader, IonContent, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonToolbar, IonContent, IonHeader, IonTitle, CommonModule, FormsModule]
})
export class DashboardPage {

}
