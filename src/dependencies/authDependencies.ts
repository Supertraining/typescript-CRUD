import { Router } from "express";
import { config } from "../config/config";
import { CustomError } from "../core/errors/customError";
import { supabase } from "../db/supabase";
import { AuthRoutes } from "../apis/auth/routes/authRoutes";
import { AuthControllerImpl } from "../apis/auth/controllers/authControllerImpl";
import { AuthRepositoryImpl } from "../apis/auth/repository/authRepositoryImpl";
import { AuthServiceImpl } from "../apis/auth/services/authServiceImpl";

const usersTable = config.supabase_users_table;

if (!usersTable) {
  throw CustomError.internalError("Supabase users table is not defined");
}

const authRepository = new AuthRepositoryImpl(supabase, usersTable);
const authService = new AuthServiceImpl(authRepository);
const authController = new AuthControllerImpl(authService);
const router = Router();
const authRouter = new AuthRoutes(authController, router);
export const authRoutes = authRouter.routes();
