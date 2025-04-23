import type { IGenericRoutes } from "../../../core/interfaces/generic-routes.core.interfaces.js";
import { AuthMiddleware } from "../../../middlewares/auth-middleware.middlewares.js";

export const CancelableAsyncOpsRoutes: IGenericRoutes[] = [
  {
    method: "get",
    path: "/",
    middlewares: [AuthMiddleware.validateRole],
    controller: "getAsyncOperations",
  },
];
