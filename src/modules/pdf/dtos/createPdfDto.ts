export class CreatePdfDto {
  constructor(public title: string, public mainText: string) {}

  static create(pdf: Record<string, any>): CreatePdfDto {
    const { title, mainText } = pdf;

    return new CreatePdfDto(title, mainText);
  }
}
