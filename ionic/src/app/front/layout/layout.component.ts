import { Component } from '@angular/core';
import { IonSplitPane, IonRouterOutlet, IonTitle, IonToolbar, IonFooter } from '@ionic/angular/standalone';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavComponent } from "./nav/nav.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: true,
    imports: [IonFooter, IonToolbar, IonTitle, IonRouterOutlet, IonSplitPane, ContentComponent, SidebarComponent, NavComponent, FooterComponent]
})
export class LayoutComponent {

  constructor() { }

}
