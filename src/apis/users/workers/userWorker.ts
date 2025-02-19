// src/workers/userWorker.ts
import { parentPort } from "worker_threads";
import { UserEntity } from "../entities/userEntity";
import { UserServiceImpl } from "../services/userServiceImpl";
import { SupabaseClient } from "../../../db/supabase/supabaseClient";
import { config } from "../../../config/config";
import { GenericDatasourceImpl } from "../../../core/datasource/genericDatasourceImpl";
import { CustomError } from "../../../core/errors/customError";
import { RegisterUserDto } from "../dtos/registerUserDto";
import { UpdateUserDto } from "../dtos/updateUserDto";
import { UserRepositoryImpl } from "../repository/userRepositoryImpl";

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
export const userServices = new UserServiceImpl(userRepository);

class UserWorker {
  private service: UserServiceImpl;

  constructor() {
    this.service = userServices;
    this.listenForMessages();
  }

  private listenForMessages() {
    parentPort?.on("message", async (message) => {
      console.log("📩 Worker received message:", message);

      if (message.action === "getAll") {
        try {
          const demandingTask = async () => {
            for (let i = 0; i < 11; i++) {
              const users: UserEntity[] = await this.service.getAll();
              console.log("📩 Worker completó la tarea: " + i);
              if (i === 10) {
                return users;
              }
            }
          };

          const users = await demandingTask();
          parentPort?.postMessage({ success: true, data: users });
        } catch (error: unknown | any) {
          parentPort?.postMessage({ success: false, error: error.message });
        }
      }
    });
  }
}

// ✅ Iniciamos el Worker automáticamente cuando se carga el archivo
new UserWorker();
