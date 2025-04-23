import { DATA_VALIDATION_ERRORS } from "../constants/ERROR_MESGS.constants.js";
import { CustomError } from "../errors/custom-error.core.erros.js";

export class NameValidator {
  validate(key: string, value: string) {
    const nameRegex = new RegExp("^[a-zA-Z ]{1,50}$");
    if (!nameRegex.test(value)) {
      throw CustomError.badRequest(DATA_VALIDATION_ERRORS.INVALID_NAME);
    }
    return value;
  }
}

export class PasswordValidator {
  validate(key: string, value: string) {
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}"
    );
    if (!passwordRegex.test(value)) {
      throw CustomError.badRequest(DATA_VALIDATION_ERRORS.INVALID_PASSWORD);
    }
    return value;
  }
}

export class ImageValidator {
  validate(key: string, value: string) {
    const imageRegex = new RegExp("^[a-zA-Z0-9._-]+(?:.(jpg|jpeg|png|gif|bmp))?$");
    if (!imageRegex.test(value)) {
      throw CustomError.badRequest(DATA_VALIDATION_ERRORS.INVALID_IMAGE_NAME);
    }
    return value;
  }
}

export class EmailValidator {
  validate(key: string, value: string) {
    const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
    if (!emailRegex.test(value)) {
      throw CustomError.badRequest(DATA_VALIDATION_ERRORS.INVALID_EMAIL);
    }
    return value;
  }
}
export class RolesValidator {
  validate(key: string, value: string[]) {
    if (!Array.isArray(value) || value[0] === undefined)
      throw CustomError.badRequest(DATA_VALIDATION_ERRORS.INVALID_ROLE_FORMAT);
    if (value.length === 0) value[0] = "USER";
    const allowedRoles = ["ADMIN", "USER"];
    if (value.length > 0 && !allowedRoles.includes(value[0])) {
      throw CustomError.badRequest(DATA_VALIDATION_ERRORS.INVALID_ROLE);
    }
    return value;
  }
}
