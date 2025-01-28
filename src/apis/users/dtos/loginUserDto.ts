import { DataValidator } from "../../../core/validators/dataValidator";
import { loginValidators } from "../validators/userDataValidator";

export class LoginUserDto {
  constructor(public email: string, public password: string) {}

  static create(object: Record<string, any>): LoginUserDto {
    const { email, password } = object;

    new DataValidator(object, loginValidators);

    return new LoginUserDto(email, password);
  }
}
