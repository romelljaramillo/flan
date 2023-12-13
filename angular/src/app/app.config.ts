import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { headerInterceptor } from '@adminModule/auth/interceptor/header.interceptor';
import { AuthService } from '@adminModule/auth/services/auth.service';
import { NotificationService } from '@adminShared/notification/notification.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions({skipInitialTransition: true}),
    ),
    provideHttpClient(
      withInterceptors([headerInterceptor])
    ),
    provideClientHydration(),
    {provide: NotificationService},
    {provide: AuthService},
  ]
};