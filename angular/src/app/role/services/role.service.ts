import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseService } from 'src/app/base/services/base.service';
import { environment } from 'src/environments/environment';
import { PermissionsCrud, PermissionsResponse } from '../interfaces/role.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {

  override init() {
    this.url = 'roles';
    this.entity = 'roles';
  }

  validationPermission(entity: string): Observable<PermissionsCrud> {
    const headers = this.authService.headers;
    const permissionsDefalt = { create: false, read: false, update: false, delete: false };
    
    return this.http.post<PermissionsResponse>(`${base_url}/haspermission`, {entity: entity}, {headers: headers})
    .pipe(
      map(response => {
        console.log(response.data);
        
        if(!response.success) {
          return permissionsDefalt;
        }

        return response.data;
      }),
      catchError(() => of(permissionsDefalt))
    );
  }
}
