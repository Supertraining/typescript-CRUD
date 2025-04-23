import { Router } from "express";
import { CancelableAsyncOpsController } from "../modules/cancelableAsyncOps/controllers/cancelable-async-ops-controller.controllers.js";
import { CancelableAsyncOpService } from "../modules/cancelableAsyncOps/services/cancelable-async-ops-service.services.js";
import { userServices } from "./user.dependencies.js";
import { RoutesBinder } from "../core/routes/route-binder.core.routes.js";
import { CancelableAsyncOpsRoutes } from "../modules/cancelableAsyncOps/routes/cancelable-async-ops-routes.routes.js";

const cancelableAsyncOpsService = new CancelableAsyncOpService(userServices);
const cancelableAsyncOpsController = new CancelableAsyncOpsController(cancelableAsyncOpsService);
const router = Router();
const cancelableAsyncOpsRouter = new RoutesBinder(cancelableAsyncOpsController, router);

export const cancelableAsyncOpsRoutes = cancelableAsyncOpsRouter.routes(CancelableAsyncOpsRoutes);
