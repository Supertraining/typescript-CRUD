import type { NextFunction, Request, Response } from "express";

export interface IPdfController {
  create(req: Request, res: Response, next: NextFunction): void;
}
