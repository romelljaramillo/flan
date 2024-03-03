import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, UrlTree, UrlSegment } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  routeLogin: string = environment.URL_LOGIN;
  routeRegister: string = environment.URL_REGISTER;
  routeDashboard: string = environment.URL_DASHBOARD;

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          const urlSegmentPath = segments.map(segment => segment.path).join('/');
          if (urlSegmentPath === this.routeLogin || urlSegmentPath === this.routeRegister) {
            return this.router.createUrlTree([this.routeDashboard]);
          }
          return true;
        } else {
          return this.router.createUrlTree([this.routeLogin]);
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      map(isLoggedIn => {
        const url: string = state.url;
        const isLoginUrl = url.startsWith(this.routeLogin);
        const isRegisterUrl = url.startsWith(this.routeRegister);
        
        if (isLoggedIn) {
          if (isLoginUrl || isRegisterUrl) {
            return this.router.createUrlTree([this.routeDashboard]);
          }
          return true;
        } else {
          if (!isLoginUrl && !isRegisterUrl) {
            return this.router.createUrlTree([this.routeLogin]);
          }
          return true;
        }
      })
    );
  }
}
