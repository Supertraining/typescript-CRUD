import { NextFunction, Request, RequestHandler, Response } from "express";
import { HTTP_STATUS } from "../../constants/HTTP_STATUS";
import { ERROR_MESSAGE } from "../../constants/ERROR_MESSGS";
import { CustomLog } from "../utils/customLogs";

interface CustomError extends Error {
  statusCode: number;
}
export class ErrorHandler {
  static errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    try {
      const errorStatus = err.statusCode || 500;
      const errorMessage = err.message || ERROR_MESSAGE.INTERNAL_ERROR;

      const additionalInfo = {
        route: req?.originalUrl,
        method: req?.method,
        ip: req?.ip,
        // user_agent: req.header[ 'user-agent' ],
        user: req?.body?.user || req?.body?.email,
      };
      CustomLog.error(err.message);
      console.log(err.stack);
      CustomLog.info(JSON.stringify(additionalInfo));

      res.status(HTTP_STATUS.OK).send({ statusCode: errorStatus, message: errorMessage });
    } catch (error) {
      console.error(error);
    }
  };
}
