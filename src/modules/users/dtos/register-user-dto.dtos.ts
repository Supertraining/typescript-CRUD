import { DataValidator } from "../../../core/validators/data-validator.core.validators.js";
import { userValidators } from "../validators/user-data-validator.validators.js";

export class RegisterUserDto {
  private constructor(
    public fullname: string,
    public email: string,
    public password: string,
    public roles: Array<string>,
    public img?: string,
    public id?: string
  ) {}

  static create(object: Record<string, any>): RegisterUserDto {
    const { fullname, email, password, roles, img } = object;

    new DataValidator(object, userValidators);

    return new RegisterUserDto(fullname, email.toLowerCase(), password, roles, img);
  }
}
