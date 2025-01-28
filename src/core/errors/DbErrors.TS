import { DB_ERRORS } from "../../constants/ERROR_MESSGS";
import { HTTP_STATUS } from "../../constants/HTTP_STATUS";
import { IDBError } from "../interfaces/iDbError";
import { CustomError } from "./customError";

export const DB_ERROR: IDBError = Object.freeze({
  ["PGRST116"]: (error: any) => new CustomError(HTTP_STATUS.BAD_REQUEST, DB_ERRORS.REGISTRY_NOT_FOUND),
  ["23502"]: (error: any) => new CustomError(HTTP_STATUS.BAD_REQUEST, DB_ERRORS.REQUIRED_FIELD),
  ["23505"]: (error: any) => new CustomError(HTTP_STATUS.BAD_REQUEST, error.details),
});
