import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseService } from 'src/app/base/services/base.service';
import { PermissionsData, HasPermissionsResponse } from '../interfaces/permission.interface';

import { environment } from 'src/environments/environment';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseService {
  override init() {
    this.url = 'permissions';
    this.entity = 'permissions';
  }


  checkPermission(route: string): Observable<PermissionsData> {
    const headers = this.authService.headers;
    const permissionsDefalt = { hasPermission: false };
    
    return this.http.post<HasPermissionsResponse>(`${base_url}/check-permissions`, {route: route}, {headers: headers})
    .pipe(
      map(response => {
        console.log(response.data);
        
        if(response.success === 'success') {
          return permissionsDefalt;
        }

        return response.data;
      }),
      catchError(() => of(permissionsDefalt))
    );
  }
}