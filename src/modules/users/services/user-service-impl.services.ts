import { UserEntity } from "../entities/user-entity.entities.js";
import { RegisterUserDto } from "../dtos/register-user-dto.dtos.js";
import type {
  IBaseCrudExtended,
  ICustomGet,
} from "../../../core/interfaces/base-crud.core.interface.ts.js";
import { UpdateUserDto } from "../dtos/update-user-dto.dtos.js";
import type { CacheHandler } from "../../../core/utils/cache-handler.core.utils.js";
import type { WorkerPool } from "../../../core/utils/worker-pool.core.utils.js";
import type { IUserService } from "../interfaces/users-services.interfaces.js";
import type { IPasswordHandler } from "../../../core/interfaces/password-handler.core.interfaces.js";
import { CustomError } from "../../../core/errors/custom-error.core.erros.js";
import { ERROR_MESSAGE } from "../../../core/constants/ERROR_MESGS.constants.js";

export class UserServiceImpl implements IUserService<UserEntity, RegisterUserDto, UpdateUserDto> {
  constructor(
    private readonly repository: IBaseCrudExtended<UserEntity, RegisterUserDto, UpdateUserDto>,
    private readonly passwordHandler?: IPasswordHandler,
    private readonly cacheHandler?: CacheHandler,
    private readonly workerPool?: WorkerPool
  ) {}
  [index: string]: any;

  async create(data: RegisterUserDto): Promise<UserEntity> {
    if (!this.passwordHandler)
      throw CustomError.internalError(
        ERROR_MESSAGE.HASH_PASSWORD_FUNCTION_NOT_DEFINED(this.create.name)
      );
    return await this.repository.create({
      ...data,
      password: await this.passwordHandler?.hash(data?.password),
    });
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.repository.getAll();
  }

  async batchedGetAll(): Promise<UserEntity[]> {
    if (!this.cacheHandler)
      throw CustomError.internalError(
        ERROR_MESSAGE.CACHE_HANDLER_NOT_DEFINED(this.batchedGetAll.name)
      );
    return await this.cacheHandler.batchRequests("getAll", () => this.getAll(), 5000);
  }

  async cachedGetAll(): Promise<UserEntity[]> {
    if (!this.cacheHandler)
      throw CustomError.internalError(
        ERROR_MESSAGE.CACHE_HANDLER_NOT_DEFINED(this.cachedGetAll.name)
      );
    return await this.cacheHandler.cacheRequests("getAll", () => this.getAll());
  }

  getAllWithWorker = async () => {
    if (!this.workerPool)
      throw CustomError.internalError(
        ERROR_MESSAGE.WORKER_POOL_NOT_DEFINED(this.getAllWithWorker.name)
      );
    console.log("📢 Sending task to the userworker to getAll");
    return await this.workerPool.executeTask({ action: "getAll" });
  };

  async getById(id: string): Promise<UserEntity> {
    return await this.repository.getById(id);
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    if (!this.passwordHandler)
      throw CustomError.internalError(
        ERROR_MESSAGE.HASH_PASSWORD_FUNCTION_NOT_DEFINED(this.update.name)
      );
    const registry = await this.repository.getById(id);

    const dataToUpdate = data.password
      ? { ...registry, ...data, password: await this.hashPassword(data.password) }
      : { ...registry, ...data };

    await this.repository.update(id, dataToUpdate);

    const updatedRegistry = await this.repository.getById(id);

    return updatedRegistry;
  }

  async delete(id: string): Promise<UserEntity> {
    return await this.repository.delete(id);
  }

  async customGet({ eqKey, eqValue, single }: ICustomGet): Promise<UserEntity[] | UserEntity> {
    return await this.repository.customGet({ eqKey, eqValue, single });
  }
}
