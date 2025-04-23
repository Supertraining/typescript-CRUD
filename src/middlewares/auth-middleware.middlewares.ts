import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../core/errors/custom-error.core.erros.js";
import { ERROR_MESSAGE } from "../core/constants/ERROR_MESGS.constants.js";
import { TokenHandler } from "../core/utils/token-handler.core.utils.js";
import { config } from "../config/config.js";
import { ROLES } from "../core/constants/ROLES.constants.js";
import { userServices } from "../dependencies/user.dependencies.js";
import type { IrequestWithUser } from "../core/interfaces/request-user.core.interface.js";

export class AuthMiddleware {
  private static verifyToken = async (
    req: Request,
    next: NextFunction
  ): Promise<{ id: string; roles: [string] } | null> => {
    try {
      const authorization = req.headers["authorization"];

      if (typeof authorization !== "string")
        throw CustomError.unauthorized(ERROR_MESSAGE.INVALID_TOKEN);
      if (!authorization) throw CustomError.unauthorized(ERROR_MESSAGE.TOKEN_NOT_FOUND);
      if (!authorization.startsWith("Bearer "))
        throw CustomError.unauthorized(ERROR_MESSAGE.TOKEN_NOT_FOUND);

      const token = authorization.split(" ")[1];
      if (!token) throw CustomError.unauthorized(ERROR_MESSAGE.TOKEN_NOT_FOUND);

      const payload = await TokenHandler.verify<{ id: string; roles: [string] }>(token);

      return payload;
    } catch (error) {
      next(error);
      return null;
    }
  };
  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = await this.verifyToken(req, next);

      if (payload === null) throw CustomError.unauthorized(ERROR_MESSAGE.INVALID_TOKEN);

      const user = await userServices.getById(payload.id);

      if (!user) throw CustomError.unauthorized(ERROR_MESSAGE.INVALID_TOKEN_USER_NOT_FOUND);

      (req as IrequestWithUser).user = user;

      next();
    } catch (error) {
      next(error);
    }
  };

  static validateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = await this.verifyToken(req, next);

      if (payload === null) throw CustomError.unauthorized(ERROR_MESSAGE.INVALID_TOKEN);

      const {
        roles: [role],
      } = payload!;
      if (role !== ROLES.ADMIN) throw CustomError.forbidden(ERROR_MESSAGE.ACCESS_DENIED);

      next();
    } catch (error) {
      next(error);
    }
  };

  static validateApiKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apiKey = req.headers["x-api-key"];

      if (!apiKey) throw CustomError.unauthorized(ERROR_MESSAGE.API_KEY_NOT_FOUND);
      if (apiKey !== config.api_key) throw CustomError.unauthorized(ERROR_MESSAGE.INVALID_API_KEY);

      next();
    } catch (error) {
      next(error);
    }
  };
}
