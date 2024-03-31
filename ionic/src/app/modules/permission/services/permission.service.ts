import { Injectable } from "@angular/core";
import { BaseService } from "@core/services/base.service";
import { PermissionAttribute } from "../interfaces/permission.interface";

@Injectable({
  providedIn: "root",
})
export class PermissionService extends BaseService<PermissionAttribute> {
  override url = "permissions";
  override entity = "permissions";
}
