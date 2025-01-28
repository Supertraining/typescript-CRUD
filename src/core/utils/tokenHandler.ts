import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { CustomError } from "../errors/customError";
import { ERROR_MESSAGE } from "../../constants/ERROR_MESSGS";

export class TokenHandler {
  static async generate(
    payload: Record<string, any>,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      if (!config.jwt_secret) throw CustomError.internalError(ERROR_MESSAGE.JWT_SECRET_NOT_DEFINED);
      jwt.sign(payload, config.jwt_secret, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);

        return resolve(token!);
      });
    });
  }

  static async verify<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, config.jwt_secret!, (err, decoded) => {
        if (err) return resolve(null);
        return resolve(decoded as T);
      });
    });
  }
}
