import type { NextFunction, Request, Response } from "express";
import { CreatePdfDto } from "../dtos/createPdfDto.js";
import { PdfService } from "../services/pdfServiceImpl.js";
import type { IPdfController } from "../interfaces/pdf-controller.interfaces.js";

export class PdfController implements IPdfController {
  constructor(private readonly service: PdfService) {}
  [index: string]: any;

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: CreatePdfDto = CreatePdfDto.create(req.body);
      const result = await this.service.create(data);

      res.json({ success: true, url: result.url });
    } catch (error) {
      next(error);
    }
  };
}
