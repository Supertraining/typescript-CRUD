import { CustomError } from "../../../core/errors/customError";
import { WorkerPool } from "../../../core/utils/workersPool";
import { CreatePdfDto } from "../dtos/createPdfDto";
import path from "path";

const workerFilePath = path.resolve(__dirname, "../workers/pdfWorker.js");
const workerPool = new WorkerPool(workerFilePath, 4);
export class PdfService {
  async create(data: CreatePdfDto): Promise<Record<string, any>> {
    try {
      const result = await workerPool.executeTask({ action: "create", data: data });

      if (result?.success) {
        return { success: true, url: result.url };
      } else {
        throw CustomError.internalError(result?.error);
      }
    } catch (error) {
      throw error;
    }
  }
}
