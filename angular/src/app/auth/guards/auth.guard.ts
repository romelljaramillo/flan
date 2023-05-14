import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
  UrlTree,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('canActivate auth');

    return this.authService.checkToken().pipe(
      tap((response) => {
        if (!response) {
          this.router.navigate(['login'], {
            queryParams: { redirectTo: state.url },
          });
        }
      })
    );
  }
}
