import { IGenericRoutes } from "../../../core/interfaces/iGenericRoutes";
import { AuthMiddleware } from "../../../middlewares/authMiddleware";

export const customUserRoutes: IGenericRoutes[] = [
  {
    method: "get",
    path: "/",
    middlewares: [],
    controller: "getAll",
  },
  {
    method: "get",
    path: "/:id",
    middlewares: [AuthMiddleware.validateRole],
    controller: "getById",
  },
  {
    method: "put",
    path: "/",
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
