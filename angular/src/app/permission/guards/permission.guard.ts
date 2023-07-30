import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { PermissionService } from '../../permission/services/permission.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private permissionService: PermissionService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    return this.permissionService.checkPermission(state.url).pipe(
      map((response) => {
        if (!response.hasPermission) {
          this.router.navigate(['/dashboard'], {
            queryParams: { redirectTo: state.url },
          });
        }
        return true;
      })
    );
  }
}
