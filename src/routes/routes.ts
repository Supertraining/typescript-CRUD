import { Router } from "express";
import { Server } from "../server.js";
import { userRoutes } from "../dependencies/user.dependencies.js";
import { authRoutes } from "../dependencies/auth.dependencies.js";
import { AuthMiddleware } from "../middlewares/auth-middleware.middlewares.js";
import { ActiveRequestMiddleware } from "../middlewares/active-request-middleware.middlewares.js";
import { cancelableAsyncOpsRoutes } from "../dependencies/cancelable-async-ops.dependencies.js";
import { pdfRoutes } from "../dependencies/pdf.dependencies.js";

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
    router.use("/api/async-operations/", AuthMiddleware.validateJWT, cancelableAsyncOpsRoutes);
    router.use("/api/pdf", AuthMiddleware.validateJWT, pdfRoutes);

    return router;
  }
}
