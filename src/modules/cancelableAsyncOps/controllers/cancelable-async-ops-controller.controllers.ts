import type { NextFunction, Request, Response } from "express";
import { ActiveRequestManager } from "../../../core/utils/active-request-manager.core.utils.js";
import { CancelableAsyncOpService } from "../services/cancelable-async-ops-service.services.js";
import type { IrequestWithUser } from "../../../core/interfaces/request-user.core.interface.js";
import type { ICancelableAsyncOpsController } from "../interfaces/cancelable-async-ops-controller.interfaces.js";

export class CancelableAsyncOpsController implements ICancelableAsyncOpsController {
  constructor(private readonly service: CancelableAsyncOpService) {}
  [index: string]: any;

  getAsyncOperations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestId = (req as IrequestWithUser).user.id;

      const activeRequests = ActiveRequestManager.getInstance();

      if (activeRequests.get(requestId)) {
        activeRequests.get(requestId)?.cancel();
      }

      const request = await this.service.executeCancelableAsyncOperations?.(requestId);

      activeRequests.set(requestId, request);

      const response = await request.start();

      if (!response) return res.json({ error: "Solicitud cancelada" });

      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}
