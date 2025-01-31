import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../entities/userEntity";
import { RegisterUserDto } from "../dtos/registerUserDto";
import { CustomError } from "../../../core/errors/customError";
import { IController, ICRUD } from "../../../core/interfaces/iCrud";
import { UpdateUserDto } from "../dtos/updateUserDto";
import { RAM } from "../../../core/utils/cacheHandler";
import { RedisClient } from "../../../db/redis/redisClient";
import { config } from "../../../config/config";

export class ControllerImpl implements IController {
  constructor(private readonly service: ICRUD<UserEntity, RegisterUserDto, UpdateUserDto>) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const registerUserDto: RegisterUserDto = RegisterUserDto.create(req.body);

      res.json(await this.service.create(registerUserDto!));
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const users = await RAM.batchRequests("getAll", () => this.service.getAll(), 5000);
      const redisClient = await new RedisClient({ ...config.redis, port: Number(config.redis.port) }).connect();
      const cache = new RAM(redisClient);
      const users = await cache.cacheRequests("getAll", () => this.service.getAll());

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
