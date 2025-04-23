import type { LoginUserDto } from "../../users/dtos/login-user-dto.dtos.js";
import type { RegisterUserDto } from "../../users/dtos/register-user-dto.dtos.js";
import type { IAuthToken } from "./auth-token.interfaces.js";

export interface IAuthService {
  login(data: LoginUserDto): Promise<IAuthToken>;
  register(data: RegisterUserDto): Promise<IAuthToken>;
}
