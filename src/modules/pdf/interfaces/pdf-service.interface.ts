import type { CreatePdfDto } from "../dtos/createPdfDto.js";


export interface IPdfService {
  create(data: CreatePdfDto): Promise<Record<string, any>>;
}