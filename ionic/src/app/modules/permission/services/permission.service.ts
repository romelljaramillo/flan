import { Injectable } from "@angular/core";
import { BaseService } from "@core/services/base.service";
import { Permission, PermissionAttribute } from "../interfaces/permission.interface";
import { Observable, catchError, map } from "rxjs";
import { BaseResponse } from "@core/interfaces/base.interface";

@Injectable({
  providedIn: "root",
})
export class PermissionService extends BaseService<PermissionAttribute> {
  override url = "permissions";
  override entity = "permissions";

  getPermissions(): Observable<Permission[]>  {
    return this.http.get<BaseResponse>(`${this.baseUrl}/${this.url}`)
      .pipe(
        map((response) => {
          if (response.data && response.data instanceof Array) {
            const permissions: Permission[] = response.data.map((permissions) => {
              let permissionAttribute = permissions.attribute as PermissionAttribute;
              return { id: Number(permissionAttribute.id), value: permissionAttribute.description };
            });
            return permissions;
          }
          return []; 
        })
      )
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }
}
