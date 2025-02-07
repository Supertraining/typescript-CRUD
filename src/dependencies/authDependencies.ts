import { Router } from "express";
import { config } from "../config/config";
import { CustomError } from "../core/errors/customError";
import { AuthRoutes } from "../apis/auth/routes/authRoutes";
import { AuthControllerImpl } from "../apis/auth/controllers/authControllerImpl";
import { AuthServiceImpl } from "../apis/auth/services/authServiceImpl";
import { userServices } from "./userDependencies";

const usersTable = config.supabase.users_table;

if (!usersTable) {
  throw CustomError.internalError("Supabase users table is not defined");
}

const authService = new AuthServiceImpl(userServices);
const authController = new AuthControllerImpl(authService);
const router = Router();
const authRouter = new AuthRoutes(authController, router);
export const authRoutes = authRouter.routes();
