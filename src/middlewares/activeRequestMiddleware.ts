import { NextFunction, Request, Response } from "express";
import { ActiveRequestManager } from "../core/utils/activeRequestHandler";

export class ActiveRequestMiddleware {
  static cancelExpensiveRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const activeResquest = ActiveRequestManager.getInstance();

      const requestId = req.body.id;

      if (activeResquest.has(requestId)) {
        activeResquest.get(requestId)?.cancel();
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
