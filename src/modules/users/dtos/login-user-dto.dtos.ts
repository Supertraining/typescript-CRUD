import { DataValidator } from "../../../core/validators/data-validator.core.validators.js";
import { loginValidators } from "../validators/user-data-validator.validators.js";

export class LoginUserDto {
  constructor(public email: string, public password: string) {}

  static create(object: Record<string, any>): LoginUserDto {
    const { email, password } = object;

    new DataValidator(object, loginValidators);

    return new LoginUserDto(email, password);
  }
}
