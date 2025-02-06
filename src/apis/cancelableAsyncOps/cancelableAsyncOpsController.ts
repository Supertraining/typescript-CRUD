import { NextFunction, Request, Response } from "express";
import { ActiveRequestManager } from "../../core/utils/activeRequestHandler";
import { CancelableAsyncOpService } from "./cancelableAsyncOpsService";

export class CancelableAsyncOpsController {
  constructor(private readonly service: CancelableAsyncOpService) {}
  [index: string]: any;

  getAsyncOperations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestId = req.body.id;

      const activeRequests = ActiveRequestManager.getInstance();

      if (activeRequests.get(requestId)) {
        activeRequests.get(requestId)?.cancel();
      }

      const request = await this.service.executeCancelableAsyncOperations?.(requestId);

      activeRequests.set(requestId, request);

      const response = await request.start();

      if (!response) return res.status(400).json({ error: "Solicitud cancelada" });

      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}
