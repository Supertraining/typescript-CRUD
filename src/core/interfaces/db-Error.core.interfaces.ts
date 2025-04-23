import { CustomError } from "../errors/custom-error.core.erros.js";

export interface IDBError {
  [key: string]: (error: any) => CustomError;
}
