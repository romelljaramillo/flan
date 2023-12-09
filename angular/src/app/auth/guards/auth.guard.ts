import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, UrlTree, UrlSegment } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const routeName = route.path;
    return this.authService.isLoggedIn().pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn && routeName !== '/login') {
          this.router.navigate(['/login']);
        } else if (isLoggedIn && routeName === '/login') {
          this.router.navigate(['/dashboard']);
        }
      }),
      map((isLoggedIn) => {
        if (routeName === '/login') {
          return true;
        }
        return isLoggedIn;
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      
    return this.authService.isLoggedIn().pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn && state.url !== '/login') {
          this.router.navigate(['/login']);
        } else if (isLoggedIn && state.url === '/login') {
          this.router.navigate(['/dashboard']);
        }
      }),
      map((isLoggedIn) => {
        if (state.url === '/login') {
          return true;
        }
        return isLoggedIn;
      })
    );
  }
}
