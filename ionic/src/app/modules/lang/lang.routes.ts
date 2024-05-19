import { Routes } from "@angular/router";

import {
  ActionCrud,
  RouteDataPermission,
} from "@modules/permission/interfaces/permission.interface";
import { AuthGuard } from "@modules/auth/auth.guard";
import { LangPage } from "./lang.page";

const entity = "langs";
const title = "Langs";

export const routesLangs: Routes = [
  {
    path: "",
    component: LangPage,
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