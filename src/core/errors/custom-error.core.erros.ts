import { HTTP_STATUS } from "../constants/HTTP_STATUS.constants.js";

export class CustomError extends Error {
  constructor(public readonly statusCode: number, public override readonly message: string) {
    super(message);
  }
  static badRequest(message: string) {
    return new CustomError(HTTP_STATUS.BAD_REQUEST, message);
  }
  static unauthorized(message: string) {
    return new CustomError(401, message);
  }
  static forbidden(message: string) {
    return new CustomError(403, message);
  }
  static notFound(message: string) {
    return new CustomError(404, message);
  }
  static internalError(message: string = "Internal Server Error") {
    return new CustomError(500, message);
  }
}
