import type { IBaseCrudExtended } from "../../../core/interfaces/base-crud.core.interface.ts.js";

export interface IUserService<T, U, V> extends IBaseCrudExtended<T, U, V> {
  batchedGetAll(): Promise<T[]>;
  cachedGetAll(): Promise<T[]>;
  getAllWithWorker(): Promise<T[]>;
}
