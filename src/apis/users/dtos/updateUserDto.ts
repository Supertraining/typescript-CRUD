import { DataValidator } from "../../../core/validators/dataValidator";
import { userValidators } from "../validators/userDataValidator";

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
