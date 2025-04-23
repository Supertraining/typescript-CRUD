import { ERROR_MESSAGE } from "../../../core/constants/ERROR_MESGS.constants.js";
import { CustomError } from "../../../core/errors/custom-error.core.erros.js";
import type { IPasswordHandler } from "../../../core/interfaces/password-handler.core.interfaces.js";
import { TokenHandler } from "../../../core/utils/token-handler.core.utils.js";
import { LoginUserDto } from "../../users/dtos/login-user-dto.dtos.js";
import { RegisterUserDto } from "../../users/dtos/register-user-dto.dtos.js";
import { UserEntity } from "../../users/entities/user-entity.entities.js";
import { UserServiceImpl } from "../../users/services/user-service-impl.services.js";
import type { IAuthService } from "../interfaces/auth-service.interfaces.js";
import type { IAuthToken } from "../interfaces/auth-token.interfaces.js";


export class AuthServiceImpl implements IAuthService {
  constructor(
    private readonly service: UserServiceImpl,
    private readonly passwordHandler: IPasswordHandler,
    private readonly generateToken = TokenHandler.generate
  ) {}

  async login(data: LoginUserDto): Promise<IAuthToken> {
    const user = (await this.service.customGet({
      eqKey: "email",
      eqValue: data.email,
      single: true,
    })) as UserEntity;

    if (!user) throw CustomError.badRequest(ERROR_MESSAGE.USER_NOT_FOUND);

    const isPasswordCorrect = await this.passwordHandler.compare(data.password, user.password);

    if (!isPasswordCorrect) throw CustomError.badRequest(ERROR_MESSAGE.INVALID_PASSWORD);

    const token = await this.generateToken({ id: user.id, roles: user.roles }, "1h");

    if (!token) throw CustomError.internalError(ERROR_MESSAGE.ERROR_GENERATING_TOKEN);

    return {
      id: user.id,
      username: user.fullname,
      email: user.email,
      token,
    };
  }

  async register(data: RegisterUserDto): Promise<IAuthToken> {
    const user = await this.service.create(data);

    const token = await this.generateToken({ id: user.id, roles: user.roles }, "1h");

    if (!token) throw CustomError.internalError(ERROR_MESSAGE.ERROR_GENERATING_TOKEN);

    return {
      id: user.id,
      username: user.fullname,
      email: user.email,
      token,
    };
  }
}
