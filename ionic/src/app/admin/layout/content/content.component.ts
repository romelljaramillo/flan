import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { IonRouterOutlet } from "@ionic/angular/standalone";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  standalone: true,
  imports: [IonRouterOutlet,   RouterModule, BreadcrumbComponent]
})
export class ContentComponent {

}
