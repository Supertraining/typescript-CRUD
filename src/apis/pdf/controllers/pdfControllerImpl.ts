import { NextFunction, Request, Response } from "express";
import { CreatePdfDto } from "../dtos/createPdfDto";
import { PdfService } from "../services/pdfServiceImpl";


export class PdfController {
  constructor(private readonly service: PdfService) {}
  [index: string]: any;

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreatePdfDto = CreatePdfDto.create(req.body);
      const result = await this.service.create(data);

      if (result?.success) {
        res.json({ success: true, url: result.url });
      } else {
        next(result?.error);
      }
    } catch (error) {
      next(error);
    }
  };
}
