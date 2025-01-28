import { NextFunction, Request, Response } from "express";
import { LoginUserDto } from "../../users/dtos/loginUserDto";
import { UserEntity } from "../../users/entities/userEntity";

export interface IAuthController {
  login(req: Request, res: Response, next: NextFunction): void;
}

export interface IAuthRepository {
  getByEmail(email: string): Promise<UserEntity>;
}

export interface IAuthService {
  login(data: LoginUserDto): Promise<IAuthToken>;
  getByEmail(email: string): Promise<UserEntity>;
}

export interface IAuthToken {
  id: string;
  username: string;
  email: string;
  token: string;
}
