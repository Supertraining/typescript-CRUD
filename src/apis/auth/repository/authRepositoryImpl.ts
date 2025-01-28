import { ERROR_MESSAGE } from "../../../constants/ERROR_MESSGS";
import { CustomError } from "../../../core/errors/customError";
import { DB_ERROR } from "../../../core/errors/DbErrors";
import { UserEntity } from "../../users/entities/userEntity";
import { UserMapper } from "../../users/entities/userMapper";
import { IAuthRepository } from "../interfaces/iAuth";

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private readonly DB: any, private readonly table: string) {
    this.DB = DB;
    this.table = table;
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const { error, data } = await this.DB.from(this.table).select().eq("email", email).single();

    if (error) {
      throw DB_ERROR[error.code](error);
    }
    
    const user = UserMapper.userEntityToUser(data);

    if (Array.isArray(user)) {
      throw CustomError.internalError(ERROR_MESSAGE.MULTIPLE_USERS_FOUND);
    }
    return user;
  }
}
