import { Injectable } from '@angular/core';
import { BaseService } from "@core/services/base.service";
import { Role, RoleAttribute, RoleResponse } from "../interfaces/role.interface";
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class RoleService extends BaseService<RoleAttribute> {
  override entity = "roles";
  override url = "roles";

  getRoles(): Observable<Role[]>  {
    return this.http.get<RoleResponse>(`${this.baseUrl}/${this.url}`)
      .pipe(
        map((response) => {
          if (response.data && response.data instanceof Array) {
            const roles = response.data.map((role) => {
              let roleAttribute = role.attribute as RoleAttribute;
              return { id: Number(roleAttribute.id), value: roleAttribute.name }; // Convert the id property to a number
            });
            return roles;
          }
          return []; // Add this line to return an empty array if the condition is not met
        })
      )
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }


}
