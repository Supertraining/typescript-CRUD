import { NextFunction, Request, Response } from "express";
import { IAuthController, IAuthService } from "../interfaces/iAuth";
import { LoginUserDto } from "../../users/dtos/loginUserDto";

export class AuthControllerImpl implements IAuthController {
  constructor(private readonly service: IAuthService) {}

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginUserDto: LoginUserDto = LoginUserDto.create(req.body);

      res.json(await this.service.login(loginUserDto));
    } catch (error) {
      next(error);
    }
  };
}
