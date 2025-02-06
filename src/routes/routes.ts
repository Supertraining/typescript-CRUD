import { Router } from "express";
import { Server } from "../server";
import { userRoutes } from "../dependencies/userDependencies";
import { authRoutes } from "../dependencies/authDependencies";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { ActiveRequestMiddleware } from "../middlewares/activeRequestMiddleware";
import { cancelableAsyncOpsRoutes } from "../dependencies/cancelableAsyncOpsDependencies";


export class AppRoutes {
  static get routes(): Router {
    const router = Server.express.Router();

    router.use("/api/users", AuthMiddleware.validateJWT, ActiveRequestMiddleware.cancelExpensiveRequests, userRoutes);
    router.use("/api/auth/", authRoutes);
    router.use("/api/getAsyncOps", cancelableAsyncOpsRoutes);

    return router;
  }
}
