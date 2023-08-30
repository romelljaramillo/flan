import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Permission, RouteDataPermission } from '../interfaces/permission.interface';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.checkPermission(route.data).pipe(
      map((response) => {
        if (response) {
          return true;
        } else if (!response && state.url !== '/dashboard') {
          this.router.navigate(['/dashboard'], {
            queryParams: { redirectTo: state.url },
          });
        } else if (!response && state.url === '/dashboard') {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return false;
      })
    );
  }
}
