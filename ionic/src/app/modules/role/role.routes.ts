import { Routes } from "@angular/router";

import {
  ActionCrud,
  RouteDataPermission,
} from "../permission/interfaces/permission.interface";
import { AuthGuard } from "@modules/auth/auth.guard";
import { RolePage } from "./role.page";

const entity = "roles";
const title = "Roles";

export const routesRoles: Routes = [
  {
    path: "",
    component: RolePage,
    data: {
      title: title,
      entity: entity,
      action: ActionCrud.list,
    } as RouteDataPermission,
    canLoad: [AuthGuard],
    children: [
      {
        path: "edit/:id",
        loadComponent: () =>
          import("./form/form.component").then((m) => m.FormComponent),
        data: {
          title: `${title}/Edit`,
          entity: entity,
          action: ActionCrud.list,
        } as RouteDataPermission,
      },
      {
        path: "add",
        loadComponent: () =>
          import("./form/form.component").then((m) => m.FormComponent),
        data: {
          title: `${title}/Add`,
          entity: entity,
          action: ActionCrud.list,
        } as RouteDataPermission,
      },
      {
        path: "",
        redirectTo: entity,
        pathMatch: "full",
      },
    ],
  },
];
