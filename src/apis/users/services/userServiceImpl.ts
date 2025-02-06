import { UserEntity } from "../entities/userEntity";
import { RegisterUserDto } from "../dtos/registerUserDto";
import { ICRUD } from "../../../core/interfaces/iCrud";
import { UpdateUserDto } from "../dtos/updateUserDto";
import { PasswordHandler } from "../../../core/utils/passHandler";

export class UserServiceImpl implements ICRUD<UserEntity, RegisterUserDto, UpdateUserDto> {
  constructor(
    private readonly repository: ICRUD<UserEntity, RegisterUserDto, UpdateUserDto>,
    private readonly hashPassword = PasswordHandler.hash
  ) {}

  async create(data: RegisterUserDto): Promise<UserEntity> {
    const hashedPassword = await this.hashPassword(data.password);

    return await this.repository.create({ ...data, password: hashedPassword });
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.repository.getAll();
  }

  async getById(id: string): Promise<UserEntity> {
    return await this.repository.getById(id);
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    const registry = await this.repository.getById(id);

    const dataToUpdate = data.password
      ? { ...registry, ...data, password: await this.hashPassword(data.password) }
      : { ...registry, ...data };

    await this.repository.update(id, dataToUpdate);

    const updatedRegistry = await this.repository.getById(id);

    return updatedRegistry;
  }

  async delete(id: string): Promise<UserEntity> {
    return await this.repository.delete(id);
  }
}
