import type { NextFunction, Request, Response } from "express";

export interface IAuthController {
  login(req: Request, res: Response, next: NextFunction): void;
  register(req: Request, res: Response, next: NextFunction): void;
}
