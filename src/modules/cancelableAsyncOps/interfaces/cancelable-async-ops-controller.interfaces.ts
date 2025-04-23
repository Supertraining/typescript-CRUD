
import type { NextFunction, Request, Response } from "express";

export interface ICancelableAsyncOpsController {
  getAsyncOperations(req: Request, res: Response, next: NextFunction): void;
}
