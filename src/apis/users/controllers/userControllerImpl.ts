import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../entities/userEntity";
import { RegisterUserDto } from "../dtos/registerUserDto";
import { CustomError } from "../../../core/errors/customError";
import { IController, ICRUD } from "../../../core/interfaces/iCrud";
import { UpdateUserDto } from "../dtos/updateUserDto";

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
      res.json(await this.service.getAll());
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
