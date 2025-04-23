import type { NextFunction, Request, Response } from "express";
import type { IAuthController } from "../interfaces/auth-controller.interfaces.js";
import type { IAuthService } from "../interfaces/auth-service.interfaces.js";
import { LoginUserDto } from "../../users/dtos/login-user-dto.dtos.js";
import { RegisterUserDto } from "../../users/dtos/register-user-dto.dtos.js";
import { HTTP_STATUS } from "../../../core/constants/HTTP_STATUS.constants.js";
import { RESPONSE_MSG } from "../../../core/constants/RESPONSE_MSGS.constants.js";

export class AuthControllerImpl implements IAuthController {
  constructor(private readonly service: IAuthService) {}
  [index: string]: any;

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginUserDto: LoginUserDto = LoginUserDto.create(req.body);

      res.json(await this.service.login(loginUserDto));
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const registerUserDto: RegisterUserDto = RegisterUserDto.create(req.body);

      res.json({
        statusCode: HTTP_STATUS.OK,
        message: RESPONSE_MSG.USER_CREATED,
        data: await this.service.register(registerUserDto),
      });
    } catch (error) {
      next(error);
    }
  };
}
