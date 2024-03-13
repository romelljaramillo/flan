import { Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { AdminPage } from "./admin.page";
import {
  ActionCrud,
  RouteDataPermission,
} from "@modules/permission/interfaces/permission.interface";
import { Profile2Component } from "./dashboard/profile2/profile2.component";

export const adminRoutes: Routes = [
  {
    path: "",
    component: AdminPage,
    data: {
      title: "Dashboard",
      entity: "dashboard",
      action: ActionCrud.list,
    } as RouteDataPermission,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("@admin/dashboard/dashboard.routes").then((m) => m.routesDashboard
          ),
        data: {
          title: "Dashboard",
          entity: "dashboard",
          action: ActionCrud.list,
        } as RouteDataPermission,
      },

      {
        path: "users",
        loadChildren: () =>
          import("@modules/user/user.routes").then((m) => m.routesUsers),
        data: {
          title: "Users",
          entity: "users",
          action: ActionCrud.list,
        } as RouteDataPermission,
      },
      /* {
        path: "profile",
        loadComponent: () =>
          import("@modules/user/profile/profile.component").then(
            (m) => m.ProfileComponent
          ),
          outlet: "sidebar",
      }, */
      {
        path: "langs",
        loadChildren: () =>
          import("@modules/lang/lang.routes").then((m) => m.routesLangs),
        data: {
          title: "Langs",
          entity: "langs",
          action: ActionCrud.list,
        } as RouteDataPermission,
      },
      {
        path: "permissions",
        loadChildren: () =>
          import("@modules/permission/permission.routes").then(
            (m) => m.routesPermissions
          ),
        data: {
          title: "Permissions",
          entity: "permissions",
          action: ActionCrud.list,
        } as RouteDataPermission,
      },
      {
        path: "roles",
        loadChildren: () =>
          import("@modules/role/role.routes").then((m) => m.routesRoles),
        data: {
          title: "Roles",
          entity: "roles",
          action: ActionCrud.list,
        } as RouteDataPermission,
      },
      {
        path: "sites",
        loadChildren: () =>
          import("@modules/site/site.routes").then((m) => m.routesSites),
        data: {
          title: "Sites",
          entity: "sites",
          action: ActionCrud.list,
        } as RouteDataPermission,
      },
      {
        path: "configurations",
        loadChildren: () =>
          import("@modules/configuration/configuration.routes").then(
            (m) => m.routesConfigurations
          ),
        data: {
          title: "Configurations",
          entity: "configurations",
          action: ActionCrud.list,
        } as RouteDataPermission,
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
    ],
  },
];
