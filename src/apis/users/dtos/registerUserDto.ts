import { DataValidator } from "../../../core/validators/dataValidator";
import { userValidators } from "../validators/userDataValidator";

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
