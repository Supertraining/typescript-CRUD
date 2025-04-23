// src/workers/userWorker.ts
import { parentPort } from "worker_threads";
import { UserEntity } from "../entities/user-entity.entities.js";
import { UserServiceImpl } from "../services/user-service-impl.services.js";
import { UserRepositoryImpl } from "../repository/user-repository-impl.repository.js";
import { SupabaseDAO } from "../../../core/dao/supabase.core.dao.js";
import type { RegisterUserDto } from "../dtos/register-user-dto.dtos.js";
import type { UpdateUserDto } from "../dtos/update-user-dto.dtos.js";
import { supabaseClient } from "../../../core/db/supabase/supabase-client.core.db.supabase.js";
import { getDbTable } from "../../../core/utils/get-db-table.core.utils.js";
import { DB_TABLES } from "../../../core/constants/DB.constants.js";

const usersTable = getDbTable({ table_name: DB_TABLES.USERS });

const datasource = new SupabaseDAO<UserEntity, RegisterUserDto, UpdateUserDto>(
  supabaseClient,
  usersTable
);
const userRepository = new UserRepositoryImpl(datasource);
const userServices = new UserServiceImpl(userRepository);

class UserWorker {
  private service: UserServiceImpl;

  constructor() {
    this.service = userServices;
    this.listenForMessages();
  }

  private listenForMessages() {
    parentPort?.on("message", async (message) => {
      console.log("3. 📩 Worker received message:", message);

      if (message.action === "getAll") {
        try {
          const demandingTask = async () => {
            for (let i = 0; i < 11; i++) {
              const users: UserEntity[] = await this.service.getAll();
              console.log("4. 📩 Worker completó la tarea: " + i);
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
