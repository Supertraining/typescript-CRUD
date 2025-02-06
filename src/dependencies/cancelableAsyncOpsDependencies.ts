import { Router } from "express";
import { CancelableAsyncOpsController } from "../apis/cancelableAsyncOps/cancelableAsyncOpsController";
import { CancelableAsyncOpService } from "../apis/cancelableAsyncOps/cancelableAsyncOpsService";
import { config } from "../config/config";
import { CustomError } from "../core/errors/customError";
import { userServices } from "./userDependencies";
import { GenericRoutesImpl } from "../core/routes/genericRoutesImpl";
import { customCancelableAsyncOpsRoutes } from "../apis/cancelableAsyncOps/routes";

const usersTable = config.supabase.users_table;

if (!usersTable) {
  throw CustomError.internalError("Supabase users table is not defined");
}

const cancelableAsyncOpsService = new CancelableAsyncOpService(userServices);
const cancelableAsyncOpsController = new CancelableAsyncOpsController(cancelableAsyncOpsService);
const router = Router();
const cancelableAsyncOpsRouter = new GenericRoutesImpl(cancelableAsyncOpsController, router);

export const cancelableAsyncOpsRoutes = cancelableAsyncOpsRouter.routes(customCancelableAsyncOpsRoutes);