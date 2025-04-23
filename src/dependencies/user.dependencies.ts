import { Router } from "express";
import { UserControllerImpl } from "../modules/users/controllers/user-controller-impl.controllers.js";
import { RegisterUserDto } from "../modules/users/dtos/register-user-dto.dtos.js";
import { UpdateUserDto } from "../modules/users/dtos/update-user-dto.dtos.js";
import { UserEntity } from "../modules/users/entities/user-entity.entities.js";
import { UserRepositoryImpl } from "../modules/users/repository/user-repository-impl.repository.js";
import { UserServiceImpl } from "../modules/users/services/user-service-impl.services.js";
import { SupabaseDAO } from "../core/dao/supabase.core.dao.js";
import { RoutesBinder } from "../core/routes/route-binder.core.routes.js";
import { supabaseClient } from "../core/db/supabase/supabase-client.core.db.supabase.js";
import { customUserRoutes } from "../modules/users/routes/user-routes.routes.js";
import { type IUserController } from "../modules/users/interfaces/users-controllers.interfaces.js";
import { CacheHandler } from "../core/utils/cache-handler.core.utils.js";
import path from "path";
import { WorkersPoolSize } from "../core/enums/workerspool-size.core.enums.js";
import { WorkerPool } from "../core/utils/worker-pool.core.utils.js";
import { PasswordHandler } from "../core/utils/password-handler.core.utils.js";
import { redisClientPromise } from "../core/db/redis/redis-connection.core.db.redis.js";
import { getDbTable } from "../core/utils/get-db-table.core.utils.js";
import { DB_TABLES } from "../core/constants/DB.constants.js";

const usersTable = getDbTable({ table_name: DB_TABLES.USERS });

const datasource = new SupabaseDAO<UserEntity, RegisterUserDto, UpdateUserDto>(
  supabaseClient,
  usersTable
);
const userRepository = new UserRepositoryImpl(datasource);

const passwordHandler = new PasswordHandler();
const cacheHandler = await CacheHandler.getInstance(() => redisClientPromise);

const __dirname =
  import.meta.url.split("/").slice(10, -2).join("/") + "/modules/users/workers/userWorker.js";

const workerFilePath = path.resolve(__dirname);

const workerPool = new WorkerPool(workerFilePath, WorkersPoolSize.ONE);

export const userServices = new UserServiceImpl(
  userRepository,
  passwordHandler,
  cacheHandler,
  workerPool
);

const userControllers = new UserControllerImpl(userServices);

const router = Router();
const userRouter = new RoutesBinder<IUserController>(userControllers, router);

export const userRoutes = userRouter.routes(customUserRoutes);
