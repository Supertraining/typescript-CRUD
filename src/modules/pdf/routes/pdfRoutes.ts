import type { IGenericRoutes } from "../../../core/interfaces/generic-routes.core.interfaces.js";

export const customPdfRoutes: IGenericRoutes[] = [
  {
    path: "/",
    method: "post",
    middlewares: [],
    controller: "create",
  },
];
