import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../entities/userEntity";
import { RegisterUserDto } from "../dtos/registerUserDto";
import { CustomError } from "../../../core/errors/customError";
import { IController, ICRUD } from "../../../core/interfaces/iCrud";
import { UpdateUserDto } from "../dtos/updateUserDto";
import { CacheHandler } from "../../../core/utils/cacheHandler";
import { RedisClient } from "../../../db/redis/redisClient";
import { config } from "../../../config/config";
import { WorkerPool } from "../../../core/utils/workersPool";
import path from "path";
import { WorkersPoolSize } from "../../../core/enums/workersPoolSize";

const workerFilePath = path.resolve(__dirname, "../workers/userWorker.js");
const workerPool = new WorkerPool(workerFilePath, WorkersPoolSize.ONE);

export class UserControllerImpl implements IController {
  constructor(private readonly service: ICRUD<UserEntity, RegisterUserDto, UpdateUserDto>) {}
  [index: string]: any;

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const users = await RAM.batchRequests("getAll", () => this.service.getAll(), 5000);

      const redisClient = await new RedisClient({
        ...config.redis,
        port: Number(config.redis.port),
      }).connect();
      const cache = new CacheHandler(redisClient);
      const users = await cache.cacheRequests("getAll", () => this.service.getAll());

      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  getAllWithWorker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("📢 Enviando solicitud al WorkerPool para getAll"); // ✅ Log cuando se llama al Worker
      const users = await workerPool.executeTask({ action: "getAll" });
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      res.json(await this.service.getById(id));
    } catch (error: CustomError | any) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const updateUserDto: UpdateUserDto = UpdateUserDto.update(req.body);
      res.json(await this.service.update(id, updateUserDto));
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      res.json((await this.service.delete(id)) === null && { message: "User deleted" });
    } catch (error) {
      next(error);
    }
  };
}
