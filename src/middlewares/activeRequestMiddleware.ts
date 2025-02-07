import { NextFunction, Request, Response } from "express";
import { ActiveRequestManager } from "../core/utils/activeRequestHandler";
import { IrequestWithUser } from "../core/interfaces/iRequestUser";

export class ActiveRequestMiddleware {
  static cancelExpensiveRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const activeResquest = ActiveRequestManager.getInstance();
      console.log((req as IrequestWithUser).user.id);
      
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
