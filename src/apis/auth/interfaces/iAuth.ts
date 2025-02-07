import { NextFunction, Request, Response } from "express";
import { LoginUserDto } from "../../users/dtos/loginUserDto";
import { RegisterUserDto } from "../../users/dtos/registerUserDto";

export interface IAuthController {
  login(req: Request, res: Response, next: NextFunction): void;
  register(req: Request, res: Response, next: NextFunction): void;
}

export interface IAuthService {
  login(data: LoginUserDto): Promise<IAuthToken>;
  register(data: RegisterUserDto): Promise<IAuthToken>;
}

export interface IAuthToken {
  id: string;
  username: string;
  email: string;
  token: string;
}
