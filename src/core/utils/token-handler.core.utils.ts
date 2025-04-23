import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import { config } from "../../config/config.js";
import { CustomError } from "../errors/custom-error.core.erros.js";
import { ERROR_MESSAGE } from "../constants/ERROR_MESGS.constants.js";

export class TokenHandler {
  static async generate(
    payload: Record<string, any>,
    duration: SignOptions["expiresIn"]
  ): Promise<string | null> {
    return new Promise((resolve) => {
      if (!config.jwt_secret) throw CustomError.internalError(ERROR_MESSAGE.JWT_SECRET_NOT_DEFINED);

      jwt.sign(payload, config.jwt_secret as Secret, { expiresIn: duration }, (err, token) => {
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
