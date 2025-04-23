import { DB_ERRORS } from "../constants/ERROR_MESGS.constants.js";
import { HTTP_STATUS } from "../constants/HTTP_STATUS.constants.js";
import type { IDBError } from "../interfaces/db-Error.core.interfaces.js";
import { CustomError } from "./custom-error.core.erros.js";

export const DB_ERROR: IDBError = Object.freeze({
  ["PGRST116"]: (error: any) => CustomError.badRequest(DB_ERRORS.REGISTRY_NOT_FOUND),
  ["23502"]: (error: any) => CustomError.badRequest(DB_ERRORS.REQUIRED_FIELD),
  ["23505"]: (error: any) => CustomError.badRequest(error.details),
});
