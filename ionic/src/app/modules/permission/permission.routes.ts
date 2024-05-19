import { Routes } from "@angular/router";

import { PermissionPage } from "./permission.page";
import {
  ActionCrud,
  RouteDataPermission,
} from "./interfaces/permission.interface";
import { AuthGuard } from "@modules/auth/auth.guard";

const entity = "permissions";
const title = "Permissions";

export const routesPermissions: Routes = [
  {
    path: "",
    component: PermissionPage,
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
