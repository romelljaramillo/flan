import { Routes } from "@angular/router";

import {
  ActionCrud,
  RouteDataPermission,
} from "@modules/permission/interfaces/permission.interface";
import { AuthGuard } from "@modules/auth/auth.guard";
import { UserPage } from "./user.page";

export const routesUsers: Routes = [
  {
    path: "",
    component: UserPage,
    data: {
      title: "Users",
      entity: "users",
      action: ActionCrud.list,
    } as RouteDataPermission,
    canLoad: [AuthGuard],
    children: [
      {
        path: "profile",
        loadComponent: () =>
          import("./profile/profile.component").then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: "edit/:id",
        loadComponent: () =>
          import('./form/form.component').then((m) => m.FormComponent),
        data: {
          title: "Users/Edit",
          entity: "users",
          action: ActionCrud.list,
        } as RouteDataPermission,
      },
      {
        path: "add",
        loadComponent: () =>
          import('./form/form.component').then((m) => m.FormComponent),
        data: {
          title: "Users/Add",
          entity: "users",
          action: ActionCrud.list,
        } as RouteDataPermission,
      },
      // {
      //   path: "",
      //   redirectTo: "users",
      //   pathMatch: "full",
      // },
    ],
  },
];
