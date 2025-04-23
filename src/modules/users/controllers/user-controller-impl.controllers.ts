import type { NextFunction, Request, Response } from "express";
import { UserEntity } from "../entities/user-entity.entities.js";
import { RegisterUserDto } from "../dtos/register-user-dto.dtos.js";
import { CustomError } from "../../../core/errors/custom-error.core.erros.js";
import { UpdateUserDto } from "../dtos/update-user-dto.dtos.js";
import type { IUserController } from "../interfaces/users-controllers.interfaces.js";
import type { IUserService } from "../interfaces/users-services.interfaces.js";

export class UserControllerImpl implements IUserController {
  constructor(private readonly service: IUserService<UserEntity, RegisterUserDto, UpdateUserDto>) {}
  [index: string]: any;

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.getAll();

      res.json(users);
    } catch (error) {
      next(error);
    }
  };
  batchedGetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.batchedGetAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };
  cachedGetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.cachedGetAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  getAllWithWorker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.getAllWithWorker();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id ?? "";
      res.json(await this.service.getById(id));
    } catch (error: CustomError | any) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id ?? "";
      const updateUserDto: UpdateUserDto = UpdateUserDto.update(req.body);
      res.json(await this.service.update(id, updateUserDto));
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id ?? "";
      res.json((await this.service.delete(id)) === null && { message: "User deleted" });
    } catch (error) {
      next(error);
    }
  };
}
