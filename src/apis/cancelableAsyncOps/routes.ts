import { IGenericRoutes } from "../../core/interfaces/iGenericRoutes";
import { AuthMiddleware } from "../../middlewares/authMiddleware";

export const customCancelableAsyncOpsRoutes: IGenericRoutes[] = [
  {
    method: "get",
    path: "/",
    middlewares: [AuthMiddleware.validateRole],
    controller: "getAsyncOperations",
  },
];
