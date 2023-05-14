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
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private roleService: RoleService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!route.data['entity']) {
      return false;
    }

    return this.roleService.validationPermission(route.data['entity']).pipe(
      map((response) => {
        if (!response.read) {
          this.router.navigate(['/dashboard'], {
            queryParams: { redirectTo: state.url },
          });
        }
        return true;
      })
    );
  }

  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   if (!route.data!['entity']) {
  //     return false;
  //   }

  //   const fullPath = segments.reduce((path, currentSegment) => {
  //     return `${path}/${currentSegment.path}`;
  //   }, '');

  //   return this.roleService.validationPermission(route.data!['entity']).pipe(
  //     map((response) => {
  //       if (!response.read) {
  //         this.router.navigate(
  //           ['login'],
  //           fullPath ? { queryParams: { redirectTo: fullPath } } : {}
  //         );
  //       }
  //       return true;
  //     })
  //   );
  // }
}
