import { ENTITIES } from "../../../core/constants/ENTITIES.constants.js";
import { CustomError } from "../../../core/errors/custom-error.core.erros.js";
import { ENTITIES_ERRORS } from "../../../core/errors/entity-errors.core.errors.js";
import { UserEntity } from "./user-entity.entities.js";

export class UserMapper {
  private static createUserEntity(user: any): UserEntity {
    const { _id, id, fullname, email, password, img, roles } = user;

    if (!_id && !id)
      throw CustomError.badRequest(
        ENTITIES_ERRORS.MISSING!(ENTITIES.USER.NAME, ENTITIES.USER.PROPERTIES.ID)
      );

    if (!fullname)
      throw CustomError.badRequest(
        ENTITIES_ERRORS.MISSING!(ENTITIES.USER.NAME, ENTITIES.USER.PROPERTIES.FULLNAME)
      );
    if (!email)
      throw CustomError.badRequest(
        ENTITIES_ERRORS.MISSING!(ENTITIES.USER.NAME, ENTITIES.USER.PROPERTIES.EMAIL)
      );
    if (!password)
      throw CustomError.badRequest(
        ENTITIES_ERRORS.MISSING!(ENTITIES.USER.NAME, ENTITIES.USER.PROPERTIES.PASSWORD)
      );
    if (!roles)
      throw CustomError.badRequest(
        ENTITIES_ERRORS.MISSING!(ENTITIES.USER.NAME, ENTITIES.USER.PROPERTIES.ROLES)
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
