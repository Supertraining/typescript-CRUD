import type { RequestHandler } from "express";
import type { ExtensibleController, Method } from "../types/generic-routes.types.js";

export interface IGenericRoutes {
  method: Method;
  path: string;
  middlewares: RequestHandler[];
  controller: ExtensibleController;
}
