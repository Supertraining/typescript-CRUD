import type { IGenericRoutes } from "../../../core/interfaces/generic-routes.core.interfaces.js";

export const AuthRoutes: IGenericRoutes[] = [
  {
    method: "post",
    path: "/login",
    middlewares: [],
    controller: "login",
  },
  {
    method: "post",
    path: "/register",
    middlewares: [],
    controller: "register",
  },
];
