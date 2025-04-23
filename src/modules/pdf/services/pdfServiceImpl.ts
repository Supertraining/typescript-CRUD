import { CustomError } from "../../../core/errors/custom-error.core.erros.js";
import { WorkerPool } from "../../../core/utils/worker-pool.core.utils.js";
import { CreatePdfDto } from "../dtos/createPdfDto.js";
import type { IPdfService } from "../interfaces/pdf-service.interface.js";

export class PdfService implements IPdfService{
  constructor(private readonly workerPool?: WorkerPool) {}
  async create(data: CreatePdfDto): Promise<Record<string, any>> {
    try {
      const result = await this.workerPool?.executeTask({ action: "create", data: data });

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
