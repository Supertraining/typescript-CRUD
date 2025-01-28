import { DATA_VALIDATION_ERRORS } from "../../constants/ERROR_MESSGS";
import { CustomError } from "../errors/customError";

export class DataValidator {
  body: Record<string, any>;
  registry: any;
  inputFields: string[];
  allowedFields: string[];
  disallowedFields: string[];
  constructor(body: Record<string, any>, validators: any) {
    this.body = body;
    this.registry = validators;
    this.inputFields = Object.keys(body);
    this.allowedFields = Array.from(this.registry.keys());

    if (this.inputFields.length === 0) {
      throw CustomError.badRequest(DATA_VALIDATION_ERRORS.NO_DATA_PROVIDED);
    }

    this.disallowedFields = this.inputFields.filter(
      (field: string) => !this.allowedFields.includes(field)
    );

    if (this.disallowedFields.length > 0) {
      throw CustomError.badRequest(
        DATA_VALIDATION_ERRORS.FIELDS_NOT_ALLOWED(this.disallowedFields.join(", "))
      );
    }

    this.validateFields();
  }

  validateFields() {
    const errors = [];

    for (const field of this.inputFields) {
      const validator = this.registry.get(field);
      if (validator) {
        try {
          this.body[field] = validator.validate(field, this.body[field]);
        } catch (error) {
          errors.push(error);
        }
      }
    }
    if (errors.length > 0) {
      throw CustomError.badRequest(errors.join(", "));
    }
  }
}
