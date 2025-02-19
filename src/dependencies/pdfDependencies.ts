import { Router } from "express";
import { GenericRoutesImpl } from "../core/routes/genericRoutesImpl";
import { customPdfRoutes } from "../apis/pdf/routes/pdfRoutes";
import { PdfService } from "../apis/pdf/services/pdfServiceImpl";
import { PdfController } from "../apis/pdf/controllers/pdfControllerImpl";

const pdfServices = new PdfService();
const pdfControllers = new PdfController(pdfServices);
const router = Router();
const pdfRouter = new GenericRoutesImpl(pdfControllers, router);
export const pdfRoutes = pdfRouter.routes(customPdfRoutes);
