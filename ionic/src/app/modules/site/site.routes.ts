import { Routes } from "@angular/router";

import {
  ActionCrud,
  RouteDataPermission,
} from "../permission/interfaces/permission.interface";
import { AuthGuard } from "@modules/auth/auth.guard";
import { SitePage } from "./site.page";

export const routesSites: Routes = [
  {
    path: "",
    component: SitePage,
    data: {
      title: "Sites",
      entity: "sites",
      action: ActionCrud.list,
    } as RouteDataPermission,
    canLoad: [AuthGuard],
  },
];
