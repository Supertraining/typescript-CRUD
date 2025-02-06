import { ActiveRequestManager } from "../../core/utils/activeRequestHandler";
import { createCancelableRequest } from "../../core/utils/cancelableRequest";
import { UserEntity } from "../users/entities/userEntity";
import { UserServiceImpl } from "../users/services/userServiceImpl";

export class CancelableAsyncOpService {
  constructor(private readonly userService: UserServiceImpl) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }

  private async *getAsyncOperations(): any {
    for (let index = 0; index <= 100; index++) {
      const users: UserEntity[] = await this.getAll();
      yield users;

      const usersOrdered = users.sort(
        (a: UserEntity, b: UserEntity) => Number(b.id) - Number(a.id)
      );
      yield usersOrdered;

      const filteredUsers = usersOrdered.filter((user: UserEntity) => +user.id >= 10);
      yield filteredUsers;

      const mappedUsers = filteredUsers.map((user: UserEntity) => user.fullname);
      yield mappedUsers;
    }
  }

  async executeCancelableAsyncOperations(requestId: string) {
    const activeRequests = ActiveRequestManager.getInstance();
    return createCancelableRequest(requestId, this.getAsyncOperations.bind(this), activeRequests);
  }
}
