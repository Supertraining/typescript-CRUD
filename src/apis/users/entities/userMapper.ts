import { ENTITIES } from "../../../constants/ENTITIES";
import { CustomError } from "../../../core/errors/customError";
import { ENTITIES_ERRORS } from "../../../core/errors/entityErrors";
import { UserEntity } from "./userEntity";

export class UserMapper {
  private static createUserEntity(user: any): UserEntity {
    const { _id, id, fullname, email, password, img, roles } = user;

    if (!_id && !id)
      throw CustomError.badRequest(
        ENTITIES_ERRORS.MISSING(ENTITIES.USER.NAME, ENTITIES.USER.PROPERTIES.ID)
      );

    if (!fullname)
      throw CustomError.badRequest(
        ENTITIES_ERRORS.MISSING(ENTITIES.USER.NAME, ENTITIES.USER.PROPERTIES.FULLNAME)
      );
    if (!email)
      throw CustomError.badRequest(
        ENTITIES_ERRORS.MISSING(ENTITIES.USER.NAME, ENTITIES.USER.PROPERTIES.EMAIL)
      );
    if (!password)
      throw CustomError.badRequest(
        ENTITIES_ERRORS.MISSING(ENTITIES.USER.NAME, ENTITIES.USER.PROPERTIES.PASSWORD)
      );
    if (!roles)
      throw CustomError.badRequest(
        ENTITIES_ERRORS.MISSING(ENTITIES.USER.NAME, ENTITIES.USER.PROPERTIES.ROLES)
      );

    return new UserEntity(fullname, email, password, roles, _id || id, img);
  }

  static userEntityToUser(user: UserEntity | UserEntity[]): UserEntity | UserEntity[] {
    if (Array.isArray(user)) {
      return user.map((user) => this.createUserEntity(user));
    } else {
      return this.createUserEntity(user);
    }
  }
}
