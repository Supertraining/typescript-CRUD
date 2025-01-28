import { ERROR_MESSAGE } from "../../../constants/ERROR_MESSGS";
import { CustomError } from "../../../core/errors/customError";
import { PasswordHandler } from "../../../core/utils/passHandler";
import { TokenHandler } from "../../../core/utils/tokenHandler";
import { LoginUserDto } from "../../users/dtos/loginUserDto";
import { UserEntity } from "../../users/entities/userEntity";
import { IAuthRepository, IAuthService, IAuthToken } from "../interfaces/iAuth";

export class AuthServiceImpl implements IAuthService {
  constructor(
    private readonly repository: IAuthRepository,
    private readonly comparePassword = PasswordHandler.compare,
    private readonly generateToken = TokenHandler.generate
  ) {}

  async login(data: LoginUserDto): Promise<IAuthToken> {
    const user: UserEntity = await this.getByEmail(data.email);

    if (!user) throw CustomError.badRequest(ERROR_MESSAGE.USER_NOT_FOUND);
    
    const isPasswordCorrect = await this.comparePassword(data.password, user.password);

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

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.repository.getByEmail(email);
  }
}
