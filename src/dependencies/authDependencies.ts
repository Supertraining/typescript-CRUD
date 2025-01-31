import { Router } from "express";
import { config } from "../config/config";
import { CustomError } from "../core/errors/customError";
import {  SupabaseClient } from "../db/supabase/supabaseClient";
import { AuthRoutes } from "../apis/auth/routes/authRoutes";
import { AuthControllerImpl } from "../apis/auth/controllers/authControllerImpl";
import { AuthRepositoryImpl } from "../apis/auth/repository/authRepositoryImpl";
import { AuthServiceImpl } from "../apis/auth/services/authServiceImpl";

const usersTable = config.supabase.users_table;

if (!usersTable) {
  throw CustomError.internalError("Supabase users table is not defined");
}

const supabaseClient = new SupabaseClient(config.supabase.credentials).getClient();

const authRepository = new AuthRepositoryImpl(supabaseClient, usersTable);
const authService = new AuthServiceImpl(authRepository);
const authController = new AuthControllerImpl(authService);
const router = Router();
const authRouter = new AuthRoutes(authController, router);
export const authRoutes = authRouter.routes();
