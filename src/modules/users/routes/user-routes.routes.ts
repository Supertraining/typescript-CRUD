import type { IGenericRoutes } from "../../../core/interfaces/generic-routes.core.interfaces.js";
import { AuthMiddleware } from "../../../middlewares/auth-middleware.middlewares.js";

export const customUserRoutes: IGenericRoutes[] = [
  {
    method: "get",
    path: "/",
    middlewares: [],
    controller: "getAll",
  },
  {
    method: "get",
    path: "/batched",
    middlewares: [],
    controller: "batchedGetAll",
  },
  {
    method: "get",
    path: "/cached",
    middlewares: [],
    controller: "cachedGetAll",
  },
  {
    method: "get",
    path: "/all/workers",
    middlewares: [],
    controller: "getAllWithWorker",
  },
  {
    method: "get",
    path: "/:id",
    middlewares: [],
    controller: "getById",
  },
  {
    method: "put",
    path: "/:id",
    middlewares: [AuthMiddleware.validateRole],
    controller: "update",
  },
  {
    method: "delete",
    path: "/:id",
    middlewares: [AuthMiddleware.validateRole],
    controller: "delete",
  },
];
