import { ENTITIES_ERRORS } from "../../../constants/ERROR_MESSGS";
import { CustomError } from "../../../core/errors/customError";
import { UserEntity } from "./userEntity";

export class UserMapper {
  private static createUserEntity(user: any): UserEntity {
    const { _id, id, fullname, email, password, img, roles } = user;
    
    if (!_id && !id) throw CustomError.badRequest(ENTITIES_ERRORS.MISSING_ID);
    if (!fullname) throw CustomError.badRequest(ENTITIES_ERRORS.MISSING_FULLNAME);
    if (!email) throw CustomError.badRequest(ENTITIES_ERRORS.MISSING_EMAIL);
    if (!password) throw CustomError.badRequest(ENTITIES_ERRORS.MISSING_PASSWORD);
    if (!roles) throw CustomError.badRequest(ENTITIES_ERRORS.MISSING_ROLES);

    return new UserEntity(fullname, email, password, roles, _id || id, img);
  }

   static userEntityToUser(user: UserEntity | UserEntity[]): UserEntity | UserEntity[] {

    if(Array.isArray(user)){
        return user.map(user => this.createUserEntity(user));
    } else {
        return this.createUserEntity(user);
    }

   }
}
