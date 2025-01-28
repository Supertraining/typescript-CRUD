interface IUserEntity {
  fullname: string;
  email: string;
  password: string;
  roles: string[];
  img?: string;
  id?: string;
}

export class UserEntity implements IUserEntity {
  constructor(
    public fullname: string,
    public email: string,
    public password: string,
    public roles: string[],
    public id: string,
    public img?: string,
  ) {}
}