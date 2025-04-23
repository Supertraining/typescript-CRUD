import type { RequestHandler } from "express";
import type { IBaseController } from "../../../core/interfaces/base-crud.core.interface.ts.js";

export interface IUserController extends IBaseController {
  batchedGetAll: RequestHandler;
  cachedGetAll: RequestHandler;
  getAllWithWorker: RequestHandler;
}
