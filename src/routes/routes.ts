import { Router } from "express";
import { Server } from "../server";
import { userRoutes } from "../dependencies/userDependencies";
import { authRoutes } from "../dependencies/authDependencies";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export class AppRoutes {
  static get routes(): Router {
    const router = Server.express.Router();

    router.use("/api/users",AuthMiddleware.validateJWT ,userRoutes);
    router.use("/api/auth/", authRoutes);

    return router;
  }
}
