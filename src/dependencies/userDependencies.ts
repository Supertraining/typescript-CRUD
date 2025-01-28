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
import { supabase } from "../db/supabase";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const usersTable = config.supabase_users_table;

if (!usersTable) {
  throw CustomError.internalError("Supabase users table is not defined");
}

const datasource = new GenericDatasourceImpl<UserEntity, RegisterUserDto, UpdateUserDto>(
  supabase,
  usersTable
);
const repository = new UserRepositoryImpl(datasource);
const services = new ServiceImpl(repository);
const controllers = new ControllerImpl(services);
const router = Router();
const userRouter = new GenericRoutesImpl(controllers, router);
export const userRoutes = userRouter.routes({
  post: [AuthMiddleware.validateRole],
  delete: [AuthMiddleware.validateRole],
});
