import type { NextFunction, Request, Response } from "express";
import { ActiveRequestManager } from "../core/utils/active-request-manager.core.utils.js";
import type { IrequestWithUser } from "../core/interfaces/request-user.core.interface.js";

export class ActiveRequestMiddleware {
  static cancelExpensiveRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const activeResquest = ActiveRequestManager.getInstance();

      const requestId = (req as IrequestWithUser).user.id;

      if (activeResquest.has(requestId)) {
        activeResquest.get(requestId)?.cancel();
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
