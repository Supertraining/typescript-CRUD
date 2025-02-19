import { Router } from "express";
import { Server } from "../server";
import { userRoutes } from "../dependencies/userDependencies";
import { authRoutes } from "../dependencies/authDependencies";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { ActiveRequestMiddleware } from "../middlewares/activeRequestMiddleware";
import { cancelableAsyncOpsRoutes } from "../dependencies/cancelableAsyncOpsDependencies";
import { pdfRoutes } from "../dependencies/pdfDependencies";

export class AppRoutes {
  static get routes(): Router {
    const router = Server.express.Router();

    router.use(
      "/api/users",
      AuthMiddleware.validateJWT,
      ActiveRequestMiddleware.cancelExpensiveRequests,
      userRoutes
    );
    router.use("/api/auth/", authRoutes);
    router.use("/api/getAsyncOps", AuthMiddleware.validateJWT, cancelableAsyncOpsRoutes);
    router.use("/api/pdf", AuthMiddleware.validateJWT, pdfRoutes);

    return router;
  }
}
