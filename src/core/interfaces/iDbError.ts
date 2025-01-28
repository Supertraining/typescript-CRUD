import { CustomError } from "../errors/customError";

export interface IDBError {
  [key: string]: (error: any) => CustomError;
}
