import { DataValidator } from "../../../core/validators/data-validator.core.validators.js";
import { userValidators } from "../validators/user-data-validator.validators.js";

export class UpdateUserDto {
  constructor(
    public fullname?: string,
    public email?: string,
    public password?: string,
    public roles?: Array<string>,
    public img?: string
  ) {}

  static update(object: Record<string, any>): UpdateUserDto {
    const { fullname, email, password, roles, img } = object;

    new DataValidator(object, userValidators);

    return new UpdateUserDto(fullname, email, password, roles, img);
  }
}
