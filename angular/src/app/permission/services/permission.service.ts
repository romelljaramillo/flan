import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseService } from 'src/app/base/services/base.service';
import { PermissionsData, HasPermissionsResponse } from '../interfaces/permission.interface';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseService {

  checkPermission(route: string): Observable<PermissionsData> {
    const headers = this.headers;
    const permissionsDefalt = { hasPermission: false };
    
    return this.http.post<HasPermissionsResponse>(`${this.base_url}/check-permissions`, {route: route}, {headers: headers})
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