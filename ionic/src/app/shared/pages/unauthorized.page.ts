import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-page-unauthorized',
  standalone: true,
  imports: [RouterModule, IonContent, IonButton],
  template: `
  <ion-content fullscreen class="content-404">
      <div class="background">
        <h2>401</h2>
        <p>Unauthorized</p>
        <ion-button href="/home" fill="outline" color="light">
          Back to Home
        </ion-button
        >
      </div>
    </ion-content>
  `,
  styles: [
    `
     .content-404 {
        --background: none;
        .background {
          background-image: url('/assets/tu-imagen-de-fondo.jpg');
          height: 100%;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 100%;

          h2,
          p {
            color: #ffffff;
            text-shadow: 2px 2px 4px #000000;
          }
        }
      }
    `,
  ],
})
export class UnauthorizedPage {
  year = new Date().getFullYear();
}
