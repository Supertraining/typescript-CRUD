import { NextFunction, Request, Response } from "express";
import { LoginUserDto } from "../../apis/users/dtos/loginUserDto";
import { UserEntity } from "../../apis/users/entities/userEntity";

export interface ICRUD<T, U, V> {
  create(data: U): Promise<T>;
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  update(id: string, data: V): Promise<T>;
  delete(id: string): Promise<T>;
}

export interface IController {
  create(req: Request, res: Response, next: NextFunction): void;

  getAll(req: Request, res: Response, next: NextFunction): void;

  getById(req: Request, res: Response, next: NextFunction): void;

  update(req: Request, res: Response, next: NextFunction): void;

  delete(req: Request, res: Response, next: NextFunction): void;
}
