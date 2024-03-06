import { Component } from '@angular/core';
import { IonMenu, IonSplitPane, IonRouterOutlet, IonTitle, IonToolbar, IonFooter, IonContent } from '@ionic/angular/standalone';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavComponent } from "./nav/nav.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: true,
    imports: [IonMenu, IonContent, IonFooter, IonToolbar, IonTitle, IonRouterOutlet, IonSplitPane, ContentComponent, SidebarComponent, NavComponent, FooterComponent]
})
export class LayoutComponent {

  constructor() { }

}
