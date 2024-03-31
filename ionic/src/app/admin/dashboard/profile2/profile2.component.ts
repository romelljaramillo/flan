import { Component, OnInit, inject, ElementRef, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, IonHeader, IonContent, IonToolbar, IonTitle, IonButtons, IonText, IonButton, IonIcon, IonMenu } from "@ionic/angular/standalone";
import { AnimationController, Animation } from '@ionic/angular';

interface Client {
  id: string;
  name: string;
}

@Component({
  selector: 'app-profile2',
  standalone: true,
  templateUrl: './profile2.component.html',
  styleUrls: ['./profile2.component.scss'],
  imports: [IonIcon, IonButton, IonText, IonHeader, IonContent, IonToolbar, IonTitle, IonButtons, IonMenu],
})
export class Profile2Component implements OnInit {
  @ViewChild('miElemento', { static: true }) miElemento!: ElementRef;
  
  clientFind: Client | undefined;

  client: Client[] = [
    { id: '1', name: 'John Doe'},
    { id: '2', name: 'Jane Doe'},
    { id: '3', name: 'Jim Doe'}
  ];
  private route = inject(ActivatedRoute);
  private animationCtrl= inject(AnimationController);
  private menuCtrl = inject(MenuController);

  constructor() {

  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const clientId = params.get('id');
      
      this.clientFind = this.client.find(client => client.id === clientId);
    });
  }

  openMenu() {
    this.menuCtrl.open('profile-menu');
  }

  closeMenu() {
    this.menuCtrl.close('profile-menu');
  }
}
