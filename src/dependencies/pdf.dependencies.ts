import { Router } from "express";
import { RoutesBinder } from "../core/routes/route-binder.core.routes.js";
import { customPdfRoutes } from "../modules/pdf/routes/pdfRoutes.js";
import { PdfService } from "../modules/pdf/services/pdfServiceImpl.js";
import { PdfController } from "../modules/pdf/controllers/pdf-controller-impl.js";
import path from "path";
import { WorkerPool } from "../core/utils/worker-pool.core.utils.js";
import { WorkersPoolSize } from "../core/enums/workerspool-size.core.enums.js";

const __dirname =
  import.meta.url.split("/").slice(10, -2).join("/") + "/modules/pdf/workers/pdfWorker.js";
const workerFilePath = path.resolve(__dirname);

const workerPool = new WorkerPool(workerFilePath, WorkersPoolSize.TWO);

const pdfServices = new PdfService(workerPool);
const pdfControllers = new PdfController(pdfServices);
const router = Router();
const pdfRouter = new RoutesBinder(pdfControllers, router);
export const pdfRoutes = pdfRouter.routes(customPdfRoutes);
