import { enableProdMode } from '@angular/core';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withViewTransitions } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './app/auth/auth.service';
import { NotificationService } from '@shared/services/notification.service';
import { headerInterceptor } from '@shared/interceptors/header.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: NotificationService},
    {provide: AuthService},
    provideIonicAngular(),
    provideRouter(routes, withViewTransitions({skipInitialTransition: true}),),
    provideHttpClient(
      withInterceptors([headerInterceptor])
    ),
    provideClientHydration(),
  ],
});
