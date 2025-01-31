import { Router } from "express";
import { ControllerImpl } from "../apis/users/controllers/userControllerImpl";
import { RegisterUserDto } from "../apis/users/dtos/registerUserDto";
import { UpdateUserDto } from "../apis/users/dtos/updateUserDto";
import { UserEntity } from "../apis/users/entities/userEntity";
import { UserRepositoryImpl } from "../apis/users/repository/userRepositoryImpl";
import { ServiceImpl } from "../apis/users/services/userServiceImpl";
import { config } from "../config/config";
import { GenericDatasourceImpl } from "../core/datasource/genericDatasourceImpl";
import { CustomError } from "../core/errors/customError";
import { GenericRoutesImpl } from "../core/routes/genericRoutesImpl";
import { SupabaseClient } from "../db/supabase/supabaseClient";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const usersTable = config.supabase.users_table;

if (!usersTable) {
  throw CustomError.internalError("Supabase users table is not defined");
}

const supabaseClient = new SupabaseClient(config.supabase.credentials).getClient();
const datasource = new GenericDatasourceImpl<UserEntity, RegisterUserDto, UpdateUserDto>(
  supabaseClient,
  usersTable
);
const userRepository = new UserRepositoryImpl(datasource);
export const userServices = new ServiceImpl(userRepository);
const userontrollers = new ControllerImpl(userServices);
const router = Router();
const userRouter = new GenericRoutesImpl(userontrollers, router);
export const userRoutes = userRouter.routes({
  post: [AuthMiddleware.validateRole],
  delete: [AuthMiddleware.validateRole],
});
