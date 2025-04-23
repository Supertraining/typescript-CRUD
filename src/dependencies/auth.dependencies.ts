import { Router } from "express";
import { AuthRoutes } from "../modules/auth/routes/auth-routes.routes.js";
import { AuthControllerImpl } from "../modules/auth/controllers/auth-controller-impl.controllers.js";
import { AuthServiceImpl } from "../modules/auth/services/auth-service-impl.services.js";
import { userServices } from "./user.dependencies.js";
import { PasswordHandler } from "../core/utils/password-handler.core.utils.js";
import { RoutesBinder } from "../core/routes/route-binder.core.routes.js";

const passwordHandler = new PasswordHandler();
const authService = new AuthServiceImpl(userServices, passwordHandler);
const authController = new AuthControllerImpl(authService);
const router = Router();
const authRouter = new RoutesBinder(authController, router);
export const authRoutes = authRouter.routes(AuthRoutes);
