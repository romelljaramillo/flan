import { Routes } from "@angular/router";

import {
  ActionCrud,
  RouteDataPermission,
} from "@modules/permission/interfaces/permission.interface";
import { AuthGuard } from "@auth/auth.guard";
import { UserPage } from "./user.page";
import { ProfileComponent } from "./profile/profile.component";

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
      // {
      //   path: "profile",
      //   component: ProfileComponent,
      //   outlet: 'secondary'
      // },
      // {
      //   path: 'edit/:id',
      //   loadComponent: () =>
      //     import('./user.page').then((m) => m.UserPage),
      // },
      // {
      //   path: '',
      //   redirectTo: 'users',
      //   pathMatch: 'full',
      // },
    ],
  },
];
