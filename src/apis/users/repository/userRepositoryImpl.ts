import { ERROR_MESSAGE } from "../../../constants/ERROR_MESSGS";
import { CustomError } from "../../../core/errors/customError";
import { ICRUD, ICustomGet } from "../../../core/interfaces/iCrud";
import { RegisterUserDto } from "../dtos/registerUserDto";
import { UpdateUserDto } from "../dtos/updateUserDto";
import { UserEntity } from "../entities/userEntity";
import { UserMapper } from "../entities/userMapper";

export class UserRepositoryImpl implements ICRUD<UserEntity, RegisterUserDto, UpdateUserDto> {
  constructor(
    private readonly genericRepository: ICRUD<UserEntity, RegisterUserDto, UpdateUserDto>
  ) {}
  async create(data: RegisterUserDto): Promise<UserEntity> {
    const newUser = await this.genericRepository.create(data);
    const newUserEntity = UserMapper.userEntityToUser(newUser);
    if (Array.isArray(newUserEntity))
      throw CustomError.internalError(ERROR_MESSAGE.MULTIPLE_USERS_FOUND);
    return newUserEntity;
  }

  async getAll(): Promise<UserEntity[]> {
    const users = await this.genericRepository.getAll();

    const usersEntity = UserMapper.userEntityToUser(users);
    if (!Array.isArray(usersEntity))
      throw CustomError.internalError(ERROR_MESSAGE.SINGLE_USER_FOUND);
    return usersEntity;
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.genericRepository.getById(id);
    const userEntity = UserMapper.userEntityToUser(user);
    if (Array.isArray(userEntity))
      throw CustomError.internalError(ERROR_MESSAGE.MULTIPLE_USERS_FOUND);
    return userEntity;
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    return await this.genericRepository.update(id, data);
  }

  async delete(id: string): Promise<UserEntity> {
    return await this.genericRepository.delete(id);
  }

  async customGet({ eqKey, eqValue, single }: ICustomGet): Promise<UserEntity[] | UserEntity> {
    return await this.genericRepository.customGet({eqKey, eqValue, single});
  }
}
