import { Routes } from "@angular/router";

import {
  ActionCrud,
  RouteDataPermission,
} from "../permission/interfaces/permission.interface";
import { AuthGuard } from "@auth/auth.guard";
import { RoleComponent } from "./role.page";

export const routesRoles: Routes = [
  {
    path: "",
    component: RoleComponent,
    data: {
      title: "Roles",
      entity: "roles",
      action: ActionCrud.list,
    } as RouteDataPermission,
    canLoad: [AuthGuard],
  },
];
