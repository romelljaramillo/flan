import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonRouterOutlet, IonContent, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonHeader, IonContent, IonRouterOutlet, RouterModule, BreadcrumbComponent, SidebarComponent]
})
export class ContentComponent {

  constructor() { }
}
