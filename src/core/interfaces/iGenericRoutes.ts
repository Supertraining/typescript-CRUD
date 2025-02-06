import { RequestHandler } from "express";

export interface IGenericRoutes {
  method: Method;
  path: string;
  middlewares: RequestHandler[];
  controller: Controller;
}
